// /src/components/invoice/InvoiceDetailPage.tsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner, Card, Table, Button, Alert } from "react-bootstrap";
import { getInvoiceById } from "../../../services/InvoiceService";
import { Invoice } from "../../models/Invoice";

const InvoiceDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [invoice, setInvoice] = useState<Invoice | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");

	useEffect(() => {
		const fetchInvoice = async () => {
			if (!id) {
				setError("No invoice ID provided.");
				return;
			}
			setLoading(true);
			try {
				const data = await getInvoiceById(Number(id));
				setInvoice(data);
			} catch (err) {
				console.error(err);
				setError("Failed to load invoice details.");
			} finally {
				setLoading(false);
			}
		};
		fetchInvoice();
	}, [id]);

	const handleBack = () => {
		navigate(-1);
	};

	if (loading) {
		return (
			<div
				className="d-flex justify-content-center align-items-center"
				style={{ minHeight: "50vh" }}>
				<Spinner animation="border" variant="primary" />
			</div>
		);
	}

	if (error) {
		return (
			<div className="container mt-3">
				<Alert variant="danger">{error}</Alert>
				<Button variant="secondary" onClick={handleBack}>
					Back
				</Button>
			</div>
		);
	}

	if (!invoice) {
		return null;
	}

	return (
		<div className="container mt-4">
			<Button variant="secondary" onClick={handleBack} className="mb-3">
				&larr; Back
			</Button>

			<Card className="shadow-sm">
				<Card.Header className="bg-primary text-white">
					<h4>Invoice Details - #{invoice.invoiceId}</h4>
				</Card.Header>
				<Card.Body>
					<Table bordered>
						<tbody>
							<tr>
								<th>Company ID</th>
								<td>{invoice.companyId}</td>
							</tr>
							<tr>
								<th>Company Name</th>
								<td>{invoice.companyName || "N/A"}</td>
							</tr>
							<tr>
								<th>Invoice Date</th>
								<td>
									{invoice.invoiceDate
										? new Date(invoice.invoiceDate).toLocaleDateString()
										: "N/A"}
								</td>
							</tr>
							<tr>
								<th>SubTotal</th>
								<td>{invoice.subTotal.toFixed(2)}</td>
							</tr>
							<tr>
								<th>Commission (20%)</th>
								<td>{invoice.commissionCut.toFixed(2)}</td>
							</tr>
							<tr>
								<th>Tax</th>
								<td>{invoice.tax.toFixed(2)}</td>
							</tr>
							<tr>
								<th>Total Amount</th>
								<td>{invoice.totalAmount.toFixed(2)}</td>
							</tr>
							<tr>
								<th>Payment Status</th>
								<td>
									{invoice.paymentStatus === 0
										? "Unpaid"
										: invoice.paymentStatus === 1
										? "Partially Paid"
										: invoice.paymentStatus === 2
										? "Paid"
										: "Unknown"}
								</td>
							</tr>
						</tbody>
					</Table>

					{/* Display line items */}
					{invoice.items && invoice.items.length > 0 && (
						<>
							<h5 className="mt-4">Line Items</h5>
							<Table striped bordered hover>
								<thead className="table-light">
									<tr>
										<th>#</th>
										<th>Description</th>
										<th>Quantity</th>
										<th>Rate</th>
										<th>Amount</th>
									</tr>
								</thead>
								<tbody>
									{invoice.items.map((item, idx) => (
										<tr key={idx}>
											<td>{idx + 1}</td>
											<td>{item.description}</td>
											<td>{item.quantity}</td>
											<td>{item.rate}</td>
											<td>{item.amount.toFixed(2)}</td>
										</tr>
									))}
								</tbody>
							</Table>
						</>
					)}
				</Card.Body>
			</Card>
		</div>
	);
};

export default InvoiceDetail;
