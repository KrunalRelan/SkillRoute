// /src/components/invoice/InvoiceList.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toast, ProgressBar } from "react-bootstrap";
import { Invoice } from "../../models/Invoice";
import { getAllInvoices } from "../../../services/InvoiceService";

const InvoiceList: React.FC = () => {
	const [invoices, setInvoices] = useState<Invoice[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Toast & progress
	const [showToast, setShowToast] = useState(false);
	const [progress, setProgress] = useState(0);

	const navigate = useNavigate();

	useEffect(() => {
		async function fetchData() {
			try {
				setLoading(true);
				setShowToast(true);
				const data = await getAllInvoices();
				if (Array.isArray(data)) {
					setInvoices(data);
				} else {
					setInvoices([]);
					setError("Server did not return a list of invoices.");
				}
			} catch (err) {
				console.error("Error fetching invoices:", err);
				setError("Failed to load invoices.");
			} finally {
				setLoading(false);
				setProgress(100);
			}
		}
		fetchData();
	}, []);

	return (
		<>
			<Toast
				onClose={() => setShowToast(false)}
				show={showToast}
				delay={3000}
				autohide>
				<Toast.Header>
					<strong className="me-auto">{loading ? "Loading..." : "Done"}</strong>
				</Toast.Header>
				<Toast.Body>
					{loading ? (
						<ProgressBar animated now={progress} />
					) : (
						error || "Invoices loaded."
					)}
				</Toast.Body>
			</Toast>

			<div className="container-fluid p-0">
				<div className="row g-0">
					<div className="col-12">
						<div className="card w-100 border-0 rounded-0">
							<div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
								<h4 className="card-title mb-0 text-white">Invoices</h4>
								<button
									className="btn btn-light"
									onClick={() => navigate("/add-invoice")}>
									+ Add Invoice
								</button>
							</div>
							<div className="card-body">
								{error && <div className="alert alert-danger">{error}</div>}
								<div className="table-responsive">
									<table className="table table-striped">
										<thead className="table-primary">
											<tr className="text-center">
												<th>Invoice #</th>
												<th>Company</th>
												<th>Invoice Date</th>
												<th>SubTotal</th>
												<th>Commission</th>
												<th>Total Amount</th>
												<th>Payment Status</th>
											</tr>
										</thead>
										<tbody>
											{invoices.map((invoice) => (
												<tr key={invoice.invoiceId} className="text-center">
													<td>
														<a
															href="#"
															onClick={(e) => {
																e.preventDefault();
																navigate(
																	`/invoice-detail/${invoice.invoiceId}`
																);
															}}>
															{invoice.invoiceId}
														</a>
													</td>
													<td>{invoice.companyName}</td>
													<td>
														{invoice.invoiceDate
															? new Date(
																	invoice.invoiceDate
															  ).toLocaleDateString()
															: "N/A"}
													</td>
													<td>{invoice.subTotal.toFixed(2)}</td>
													<td>{invoice.commissionCut.toFixed(2)}</td>
													<td>{invoice.totalAmount.toFixed(2)}</td>
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
											))}
											{invoices.length === 0 && !loading && (
												<tr>
													<td colSpan={7} className="text-center">
														No Invoices found.
													</td>
												</tr>
											)}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default InvoiceList;
