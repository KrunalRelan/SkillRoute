import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toast, ProgressBar } from "react-bootstrap";
// If you don't need a date picker, remove these imports:
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

import { RegisterCompany } from "../../models/RegisterCompany";
// Suppose you have a service function that creates a new company
// Adjust the import and function name as needed.
import { saveCompany, getCategories } from "../../../services/CompanyService";
import { Button, SelectChangeEvent, LinearProgress } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Category } from "../../models/Category";

// Define VisuallyHiddenInput component
const VisuallyHiddenInput = (
	props: React.InputHTMLAttributes<HTMLInputElement>
) => <input style={{ display: "none" }} {...props} />;

type FileState = {
	file: File | null;
	preview: string | null;
};

const AddNewCompany: React.FC = () => {
	// --------------------------------------
	// 1. STATE FOR FORM DATA & TOAST
	// --------------------------------------
	const [formData, setFormData] = useState<RegisterCompany>({
		companyId: null,
		companyName: "",
		addressLine: "",
		email: "",
		phone: "",
		image: "",
		enquirerName: "",
		postalCode: "",
		city: "",
		country: "",
		state: "",
		categoryName: "",
		categoryId: null,
	});

	// Validation errors
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	// Toast & progress states
	const [showToast, setShowToast] = useState(false);
	const [progress, setProgress] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [fileState, setFileState] = useState<FileState>({
		file: null,
		preview: null,
	});
	const [categories, setCategories] = useState<Category[]>([]);
	
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setFileState({
				file,
				preview: URL.createObjectURL(file),
			});
			setFormData((prev) => ({
				...prev,
				image: file.name,
			}));
		}
	};
	// Navigation after success
	const navigate = useNavigate();

	// --------------------------------------
	// 2. HANDLE INPUT CHANGES
	// --------------------------------------
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleCategoryChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		const selectedId = Number(event.target.value);
		const selectedCategory = categories.find(
			(cat) => cat.categoryId === selectedId
		);

		setFormData((prev) => ({
			...prev,
			categoryId: selectedId,
			categoryName: selectedCategory?.categoryName || "",
		}));
	};

	// --------------------------------------
	// 3. VALIDATION FUNCTION
	// --------------------------------------
	const validateForm = () => {
		const newErrors: { [key: string]: string } = {};
		const fields = [
			{
				key: "companyName",
				value: formData.companyName?.trim(),
				message: "Company name is required",
			},
			{
				key: "addressLine",
				value: formData.addressLine?.trim(),
				message: "Address is required",
			},
			{
				key: "email",
				value: formData.email?.trim(),
				message: "Email is required",
			},
			{
				key: "phone",
				value: formData.phone?.trim(),
				message: "Phone is required",
			},
			{
				key: "enquirerName",
				value: formData.enquirerName?.trim(),
				message: "Enquirer Name is required",
			},
			{
				key: "categoryId", // Changed from category to categoryId
				value: formData.categoryId,
				message: "Category is required",
			},
			// {
			// 	key: "image",
			// 	value: fileState.file,
			// 	message: "Company logo is required",
			// },
		];

		fields.forEach((field) => {
			switch (field.key) {
				case "categoryId":
					if (!field.value || field.value === 0) {
						newErrors[field.key] = field.message;
					}
					break;
				case "email":
					if (!field.value) {
						newErrors[field.key] = field.message;
					} else if (
						typeof field.value === "string" &&
						!/\S+@\S+\.\S+/.test(field.value)
					) {
						newErrors[field.key] = "Enter a valid email address";
					}
					break;
				default:
					if (!field.value) {
						newErrors[field.key] = field.message;
					}
			}
		});

		return newErrors;
	};

	// --------------------------------------
	// 4. HANDLE FORM SUBMISSION
	// --------------------------------------
	const handleSubmit = async () => {
		const formErrors = validateForm();
		if (Object.keys(formErrors).length > 0) {
			setErrors(formErrors);
			return;
		}
		setErrors({});
		setErrorMessage(null);

		try {
			setIsLoading(true);
			setShowToast(true);

			// Progress bar logic
			const progressInterval = setInterval(() => {
				setProgress((oldProgress) => {
					if (oldProgress >= 100) {
						clearInterval(progressInterval);
						return 100;
					}
					return oldProgress + 10;
				});
			}, 200);

			const companyId = await saveCompany(formData);

			if (companyId) {
				navigate("/registered-companies");
			}
		} catch (error) {
			setErrorMessage(error?.toString() || "Failed to save company details");
			setProgress(0);
		} finally {
			setIsLoading(false);
			setShowToast(false);
		}
	};

	useEffect(() => {
		return () => {
			if (fileState.preview) {
				URL.revokeObjectURL(fileState.preview);
			}
		};
	}, [fileState.preview]);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const data = await getCategories();
				setCategories(data);
			} catch (error) {
				console.error("Error fetching categories:", error);
			}
		};
		fetchCategories();
	}, []);

	return (
		<>
			{/* Toast Notification */}
			<Toast
				onClose={() => setShowToast(false)}
				show={showToast}
				delay={3000}
				autohide>
				<Toast.Header>
					<strong className="me-auto">
						{isLoading ? "Saving..." : "Error"}
					</strong>
				</Toast.Header>
				<Toast.Body>
					{isLoading ? (
						<ProgressBar animated now={progress} />
					) : (
						"An error occurred while saving the company."
					)}
				</Toast.Body>
			</Toast>

			<div className="container-fluid p-0">
				<div className="row g-0">
					<div className="col-12">
						<div className="card w-100 border-0 rounded-0">
							<div className="card-header bg-primary text-white">
								<h4 className="card-title mb-0 text-white">Add New Company</h4>
							</div>
							<div className="card-body">
								<form>
									<div className="row">
										{/* Category */}
										<div className="col-lg-6 mb-3">
											<label className="text-label text-primary">
												Category <span className="required">*</span>
											</label>
											<select
												name="categoryId"
												className="form-select"
												value={formData.categoryId || ""}
												onChange={handleCategoryChange}>
												<option value="">Select Category</option>
												{categories.map((category) => (
													<option
														key={category.categoryId}
														value={category.categoryId ?? ""}>
														{category.categoryName}
													</option>
												))}
											</select>
											{errors.categoryId && (
												<small className="text-danger">
													{errors.categoryId}
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
												name="companyName"
												className="form-control"
												value={formData.companyName}
												onChange={handleChange}
											/>
											{errors.companyName && (
												<small className="text-danger">
													{errors.companyName}
												</small>
											)}
										</div>

										{/* Email */}
										<div className="col-lg-6 mb-3">
											<label className="text-label text-primary">
												Email
												<span className="required">*</span>
											</label>
											<input
												type="email"
												name="email"
												className="form-control"
												value={formData.email || ""}
												onChange={handleChange}
											/>
											{errors.email && (
												<small className="text-danger">{errors.email}</small>
											)}
										</div>

										{/* Address */}
										{/* Address Line */}
										<div className="col-lg-6 mb-3">
											<label className="text-label text-primary">
												Address Line <span className="required">*</span>
											</label>
											<input
												type="text"
												name="addressLine"
												className="form-control"
												value={formData.addressLine ?? ""}
												onChange={handleChange}
											/>
											{errors.addressLine && (
												<small className="text-danger">
													{errors.addressLine}
												</small>
											)}
										</div>

										{/* Postal Code */}
										<div className="col-lg-6 mb-3">
											<label className="text-label text-primary">
												Postal Code <span className="required">*</span>
											</label>
											<input
												type="text"
												name="postalCode"
												className="form-control"
												value={formData.postalCode ?? ""}
												onChange={handleChange}
											/>
											{errors.postalCode && (
												<small className="text-danger">
													{errors.postalCode}
												</small>
											)}
										</div>

										{/* City */}
										<div className="col-lg-6 mb-3">
											<label className="text-label text-primary">
												City <span className="required">*</span>
											</label>
											<input
												type="text"
												name="city"
												className="form-control"
												value={formData.city ?? ""}
												onChange={handleChange}
											/>
											{errors.city && (
												<small className="text-danger">{errors.city}</small>
											)}
										</div>

										{/* State/Province */}
										<div className="col-lg-6 mb-3">
											<label className="text-label text-primary">
												State/Province <span className="required">*</span>
											</label>
											<input
												type="text"
												name="state"
												className="form-control"
												value={formData.state?.trim()}
												onChange={handleChange}
											/>
											{errors.state && (
												<small className="text-danger">{errors.state}</small>
											)}
										</div>

										{/* Country */}
										<div className="col-lg-6 mb-3">
											<label className="text-label text-primary">
												Country <span className="required">*</span>
											</label>
											<input
												type="text"
												name="country"
												className="form-control"
												value={formData.country ?? ""}
												onChange={handleChange}
											/>
											{errors.country && (
												<small className="text-danger">{errors.country}</small>
											)}
										</div>

										{/* Phone */}
										<div className="col-lg-6 mb-3">
											<label className="text-label text-primary">
												Phone
												<span className="required">*</span>
											</label>
											<input
												type="text"
												name="phone"
												className="form-control"
												value={formData.phone || ""}
												onChange={handleChange}
											/>
											{errors.phone && (
												<small className="text-danger">{errors.phone}</small>
											)}
										</div>
										{/*Enquirer Name*/}
										<div className="col-lg-6 mb-3">
											<label className="text-label text-primary">
												Enquirer Name <span className="required">*</span>
											</label>
											<input
												type="text"
												name="enquirerName"
												className="form-control"
												value={formData.enquirerName}
												onChange={handleChange}
											/>
											{errors.companyName && (
												<small className="text-danger">
													{errors.companyName}
												</small>
											)}
										</div>
										{/* Image */}
										<div className="col-lg-6 mb-3">
											<label className="text-label text-primary">
												Company Logo <span className="required">*</span>
											</label>
											<div>
												<Button
													component="label"
													variant="contained"
													startIcon={<CloudUploadIcon />}
													sx={{ marginBottom: 1 }}>
													Upload Logo
													<VisuallyHiddenInput
														type="file"
														onChange={handleFileChange}
														accept="image/*"
													/>
												</Button>
												{fileState.preview && (
													<div style={{ marginTop: 10 }}>
														<img
															src={fileState.preview}
															alt="Preview"
															style={{ maxWidth: "200px", maxHeight: "200px" }}
														/>
													</div>
												)}
												{errors.image && (
													<small className="text-danger">{errors.image}</small>
												)}
											</div>
										</div>

										<div className="col-12">
											<button
												type="button"
												className="btn btn-primary"
												onClick={handleSubmit}>
												{isLoading ? "Submitting..." : "Submit"}
											</button>
										</div>
									</div>
								</form>

								{/* Display potential general error messages, if any */}
								{errors["general"] && (
									<div className="text-danger mt-2">{errors["general"]}</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AddNewCompany;
