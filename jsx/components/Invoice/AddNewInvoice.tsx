// /src/components/invoice/AddNewInvoice.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toast, ProgressBar } from "react-bootstrap";
import { Invoice } from "../../models/Invoice";
import { InvoiceItem } from "../../models/InvoiceItem";
import { createInvoice } from "../../../services/InvoiceService";

const AddNewInvoice: React.FC = () => {
	// Initialize with two default line items if desired:
	// 1) Trainer Fees, 2) Outbound Hotel
	const [formData, setFormData] = useState<Invoice>({
		companyId: null,
		companyName: "",
		subTotal: 0,
		commissionCut: 0,
		tax: 0,
		totalAmount: 0,
		items: [
			{
				description: "Trainer Fees",
				quantity: 1,
				rate: 1000,
				amount: 0,
			},
			{
				description: "Outbound Hotel",
				quantity: 1,
				rate: 2000,
				amount: 0,
			},
		],
	});

	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [showToast, setShowToast] = useState(false);
	const [progress, setProgress] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	// Validate form fields
	const validateForm = () => {
		const newErrors: { [key: string]: string } = {};

		if (!formData.companyId) {
			newErrors.companyId = "Company ID is required.";
		}
		if (!formData.companyName?.trim()) {
			newErrors.companyName = "Company Name is required.";
		}

		// If you want to ensure at least one item, you can check here:
		if (!formData.items || formData.items.length === 0) {
			newErrors.items = "Please add at least one line item.";
		}

		return newErrors;
	};

	// Handle top-level numeric fields for the invoice (like companyId)
	const handleInvoiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[id]: id === "companyId" ? parseInt(value, 10) : value,
		}));
	};

	// Handle top-level text fields (like companyName)
	const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[id]: value,
		}));
	};

	// Handle changes to individual line items
	const handleItemChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		const { name, value } = e.target;
		setFormData((prev) => {
			const updatedItems = [...prev.items];
			const itemToUpdate = { ...updatedItems[index] };

			if (name === "description") {
				itemToUpdate.description = value;
			} else if (name === "quantity") {
				itemToUpdate.quantity = parseInt(value, 10) || 0;
			} else if (name === "rate") {
				itemToUpdate.rate = parseFloat(value) || 0;
			}

			// Recalculate amount = quantity * rate
			itemToUpdate.amount = itemToUpdate.quantity * itemToUpdate.rate;

			updatedItems[index] = itemToUpdate;
			return { ...prev, items: updatedItems };
		});
	};

	// Add a new line item
	const addNewItem = () => {
		setFormData((prev) => ({
			...prev,
			items: [
				...prev.items,
				{ description: "", quantity: 1, rate: 0, amount: 0 },
			],
		}));
	};

	// Remove an existing line item
	const removeItem = (index: number) => {
		setFormData((prev) => {
			const updatedItems = [...prev.items];
			updatedItems.splice(index, 1);
			return { ...prev, items: updatedItems };
		});
	};

	const handleSubmit = async () => {
		const formErrors = validateForm();
		if (Object.keys(formErrors).length > 0) {
			setErrors(formErrors);
			return;
		}
		setErrors({});

		// Compute subTotal, commission (20%), and tax before sending to API
		let subTotal = 0;
		formData.items.forEach((item) => {
			subTotal += item.amount;
		});

		// 20% commission
		const commissionCut = subTotal * 0.2;

		// Example: 18% GST on (subTotal + commission)
		const tax = (subTotal + commissionCut) * 0.18;

		const totalAmount = subTotal + commissionCut + tax;

		// Build final payload
		const payload: Invoice = {
			...formData,
			subTotal,
			commissionCut,
			tax,
			totalAmount,
		};

		try {
			setIsLoading(true);
			setShowToast(true);
			setProgress(0);

			// Simulate a progress bar
			const interval = setInterval(() => {
				setProgress((old) => {
					if (old >= 100) {
						clearInterval(interval);
						return 100;
					}
					return old + 20;
				});
			}, 300);

			await createInvoice(payload);

			clearInterval(interval);
			setProgress(100);

			// Close toast and navigate away
			setTimeout(() => {
				setShowToast(false);
				navigate("/invoices");
			}, 800);
		} catch (error) {
			console.error("Error saving invoice:", error);
			setIsLoading(false);
			// Keep toast open, show error
			setProgress(100);
		}
	};

	return (
		<>
			{/* Toast */}
			<Toast
				onClose={() => setShowToast(false)}
				show={showToast}
				delay={3000}
				autohide>
				<Toast.Header>
					<strong className="me-auto">
						{isLoading ? "Saving Invoice..." : "Error"}
					</strong>
				</Toast.Header>
				<Toast.Body>
					{isLoading ? (
						<ProgressBar animated now={progress} />
					) : (
						"An error occurred while saving the invoice."
					)}
				</Toast.Body>
			</Toast>

			<div className="container-fluid p-0">
				<div className="row g-0">
					<div className="col-12">
						<div className="card w-100 border-0 rounded-0">
							<div className="card-header bg-primary text-white">
								<h4 className="card-title mb-0 text-white">Add New Invoice</h4>
							</div>
							<div className="card-body">
								<form>
									<div className="row">
										{/* Company ID */}
										<div className="col-lg-6 mb-3">
											<label className="text-label text-primary">
												Company ID <span className="required">*</span>
											</label>
											<input
												type="number"
												id="companyId"
												className="form-control"
												value={formData.companyId ?? ""}
												onChange={handleInvoiceChange}
											/>
											{errors.companyId && (
												<small className="text-danger">
													{errors.companyId}
												</small>
											)}
										</div>

										{/* Company Name */}
										<div className="col-lg-6 mb-3">
											<label className="text-label text-primary">
												Company Name <span className="required">*</span>
											</label>
											<input
												type="text"
												id="companyName"
												className="form-control"
												value={formData.companyName}
												onChange={handleTextChange}
											/>
											{errors.companyName && (
												<small className="text-danger">
													{errors.companyName}
												</small>
											)}
										</div>
									</div>

									{/* Line Items Section */}
									<div className="row mt-4">
										<div className="col-12 mb-2">
											<h5 className="text-primary">Line Items</h5>
											{errors.items && (
												<small className="text-danger d-block">
													{errors.items}
												</small>
											)}
										</div>

										{formData.items.map((item, index) => (
											<div key={index} className="row mb-2">
												<div className="col-md-4">
													<input
														type="text"
														className="form-control"
														name="description"
														value={item.description}
														placeholder="Item Description"
														onChange={(e) => handleItemChange(e, index)}
													/>
												</div>
												<div className="col-md-2">
													<input
														type="number"
														className="form-control"
														name="quantity"
														value={item.quantity}
														onChange={(e) => handleItemChange(e, index)}
													/>
												</div>
												<div className="col-md-2">
													<input
														type="number"
														className="form-control"
														name="rate"
														value={item.rate}
														onChange={(e) => handleItemChange(e, index)}
													/>
												</div>
												<div className="col-md-2">
													<input
														type="number"
														className="form-control"
														name="amount"
														value={item.amount}
														disabled
													/>
												</div>
												<div className="col-md-2">
													<button
														type="button"
														className="btn btn-danger"
														onClick={() => removeItem(index)}>
														Remove
													</button>
												</div>
											</div>
										))}

										<div className="col-12">
											<button
												type="button"
												className="btn btn-secondary"
												onClick={addNewItem}>
												+ Add Another Item
											</button>
										</div>
									</div>

									{/* Submit */}
									<div className="row mt-4">
										<div className="col-12">
											<button
												type="button"
												className="btn btn-primary"
												onClick={handleSubmit}>
												Submit
											</button>
										</div>
									</div>
								</form>
								{/* End of form */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AddNewInvoice;
