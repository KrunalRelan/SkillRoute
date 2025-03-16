import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toast, ProgressBar } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Import your interfaces
import { Enquiry } from "../../models/Enquiry"; // Adjust the path
import { Facility } from "../../models/Facility"; // Adjust the path

import { getCategories, saveEnquiry } from "../../../services/CompanyService"; // Adjust the path if needed
import { Category } from "../../models/Category";

const AddNewEnquiry: React.FC = () => {
	// --------------------------------------
	// Default facility object
	// --------------------------------------
	const defaultFacilities: Facility = {
		Food: false,
		Travel: false,
		Accommodation: false,
		other: false,
		otherDetails: "",
	};

	// --------------------------------------
	// STATE FOR FORM DATA (Enquiry) & TOAST
	// --------------------------------------
	const [formData, setFormData] = useState<Enquiry>({
		id: null,
		companyName: "",
		enquirerName: "",
		addressLine: "",
		email: "",
		areaOfTraining: "",
		numberOfHours: 0,
		numberOfDays: 0,
		pricePerSession: 0,
		pricePerDay: 0,
		trainingLevel: "",
		numberOfPeopleToTrain: 0,
		numberOfBatches: 0,
		time: "",
		day: "",
		month: "",
		companyId: null,
		facilities: defaultFacilities,
		city: "",
		state: "",
		postalCode: "",
		country: "",
		categoryName: "",
		categoryId: 0,
	});

	// Validation errors
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	// Toast & progress
	const [showToast, setShowToast] = useState(false);
	const [progress, setProgress] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	// For Month Picker (react-datepicker)
	const [selectedMonthDate, setSelectedMonthDate] = useState<Date | null>(
		new Date()
	);

	const [categories, setCategories] = useState<Category[]>([]);

	// Navigation
	const navigate = useNavigate();

	// --------------------------------------
	// HANDLE MONTH PICKER CHANGE
	// --------------------------------------
	const handleMonthChange = (date: Date | null) => {
		setSelectedMonthDate(date);

		if (date) {
			// Convert JS month (0-11) to 1-12, or use month name if you prefer
			const monthNumber = date.getMonth() + 1;
			setFormData((prev) => ({
				...prev,
				month: monthNumber.toString(),
			}));
		} else {
			setFormData((prev) => ({
				...prev,
				month: "",
			}));
		}
	};

	// --------------------------------------
	// HANDLE INPUT CHANGES
	// --------------------------------------
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { id, value, type, checked } = e.target as HTMLInputElement;

		// If it's a numeric field
		if (
			id === "numberOfHours" ||
			id === "numberOfDays" ||
			id === "pricePerSession" ||
			id === "pricePerDay" ||
			id === "numberOfPeopleToTrain" ||
			id === "numberOfBatches"
		) {
			setFormData((prev) => ({
				...prev,
				[id]: parseFloat(value),
			}));
			return;
		}

		// If it's one of the facility checkboxes or facility fields
		if (
			id === "Food" ||
			id === "Travel" ||
			id === "Accommodation" ||
			id === "other"
		) {
			// Update the nested facilities object
			setFormData((prev) => ({
				...prev,
				facilities: {
					...prev.facilities,
					[id]: checked,
				},
			}));
			return;
		}

		if (id === "otherDetails") {
			// Also update nested facility field
			setFormData((prev) => ({
				...prev,
				facilities: {
					...prev.facilities,
					otherDetails: value,
				},
			}));
			return;
		}

		// Otherwise handle a standard text/checkbox field at the top level
		if (type === "checkbox") {
			// Example if you had a top-level 'someBoolean'
			setFormData((prev) => ({ ...prev, [id]: checked }));
		} else {
			// Standard text field
			setFormData((prev) => ({ ...prev, [id]: value }));
		}
	};

	// --------------------------------------
	// VALIDATION FUNCTION
	// --------------------------------------
	const validateForm = () => {
		const newErrors: { [key: string]: string } = {};

		// Example required fields
		if (!formData.companyName.trim()) {
			newErrors.companyName = "Company name is required";
		}
		if (!formData.enquirerName.trim()) {
			newErrors.enquirerName = "Enquirer name is required";
		}
		if (!formData.addressLine.trim()) {
			newErrors.addessLine = "Location is required";
		}
		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Enter a valid email address";
		}
		if (!formData.areaOfTraining.trim()) {
			newErrors.areaOfTraining = "Area of training is required";
		}

		// Numeric validations
		if (formData.numberOfHours <= 0) {
			newErrors.numberOfHours = "Number of Hours must be > 0";
		}
		if (formData.numberOfDays <= 0) {
			newErrors.numberOfDays = "Number of Days must be > 0";
		}
		if (formData.pricePerSession < 0) {
			newErrors.pricePerSession = "Price per session cannot be negative";
		}
		if (formData.pricePerDay < 0) {
			newErrors.pricePerDay = "Price per day cannot be negative";
		}
		if (!formData.trainingLevel.trim()) {
			newErrors.trainingLevel = "Training level is required";
		}
		if (formData.numberOfPeopleToTrain <= 0) {
			newErrors.numberOfPeopleToTrain = "Number of People must be > 0";
		}
		if (formData.numberOfBatches <= 0) {
			newErrors.numberOfBatches = "Number of Batches must be > 0";
		}
		if (!formData.time) {
			newErrors.time = "Time is required";
		}
		if (!formData.day.trim()) {
			newErrors.day = "Day is required";
		}
		if (!formData.month.trim()) {
			newErrors.month = "Month is required";
		}

		if (!formData.categoryId) {
			newErrors.category = "Category is required";
		}

		// Facilities -> If user selected "other", they must fill otherDetails
		if (
			formData.facilities.other &&
			!formData.facilities.otherDetails?.trim()
		) {
			newErrors.otherDetails = "Please specify details for 'Other' facility.";
		}

		if (!formData.city.trim()) {
			newErrors.city = "City is required";
		}
		if (!formData.state.trim()) {
			newErrors.state = "State is required";
		}
		if (!formData.postalCode.trim()) {
			newErrors.posstalCode = "PIN/Postal code is required";
		} else if (!/^[A-Za-z0-9\s]{4,10}$/.test(formData.postalCode)) {
			newErrors.postalCode =
				"PIN/Postal code must be 4-10 characters (letters, numbers, spaces)";
		}
		if (!formData.country.trim()) {
			newErrors.country = "Country is required";
		}

		return newErrors;
	};

	// --------------------------------------
	// HANDLE FORM SUBMISSION
	// --------------------------------------
	const handleSubmit = async () => {
		// Validate
		const formErrors = validateForm();
		if (Object.keys(formErrors).length > 0) {
			setErrors(formErrors);
			return;
		}
		setErrors({});

		// Construct final Enquiry object
		// (We already have it in the correct shape because we're using interfaces + formData)
		const enquiry: Enquiry = {
			...formData,
			// facilities are already included in formData
		};

		try {
			setIsLoading(true);
			setShowToast(true);

			// Simulate progress
			const progressInterval = setInterval(() => {
				setProgress((oldProgress) => {
					if (oldProgress >= 100) {
						clearInterval(progressInterval);
						return 100;
					}
					return oldProgress + 10;
				});
			}, 200);

			// Save the enquiry
			await saveEnquiry(enquiry);

			// Cleanup & redirect
			clearInterval(progressInterval);
			setProgress(100);

			setTimeout(() => {
				setShowToast(false);
				navigate("/company-enquiries");
			}, 1000);
		} catch (error) {
			console.error("Error saving enquiry:", error);
			setShowToast(true);
			setProgress(100);
		} finally {
			setIsLoading(false);
		}
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

	useEffect(() => {
		setIsLoading(true);
		const fetchCategories = async () => {
			try {
				const data = await getCategories();
				setCategories(data);
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching categories:", error);
			}
		};
		fetchCategories();
	}, []);

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
						{isLoading ? "Saving..." : "Error"}
					</strong>
				</Toast.Header>
				<Toast.Body>
					{isLoading ? (
						<ProgressBar animated now={progress} />
					) : (
						"An error occurred while saving new enquiry."
					)}
				</Toast.Body>
			</Toast>

			<div className="container-fluid p-0">
				<div className="row g-0">
					<div className="col-12">
						<div className="card w-100 border-0 rounded-0">
							<div className="card-header bg-primary text-white">
								<h4 className="card-title mb-0 text-white">Add New Enquiry</h4>
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
												id="companyName"
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

										{/* Enquirer Name */}
										<div className="col-lg-6 mb-3">
											<label className="text-label text-primary">
												Enquirer Name <span className="required">*</span>
											</label>
											<input
												type="text"
												id="enquirerName"
												className="form-control"
												value={formData.enquirerName}
												onChange={handleChange}
											/>
											{errors.enquirerName && (
												<small className="text-danger">
													{errors.enquirerName}
												</small>
											)}
										</div>

										{/* Email */}
										<div className="col-lg-6 mb-3">
											<label className="text-label text-primary">
												Email <span className="required">*</span>
											</label>
											<input
												type="email"
												id="email"
												className="form-control"
												value={formData.email}
												onChange={handleChange}
											/>
											{errors.email && (
												<small className="text-danger">{errors.email}</small>
											)}
										</div>

										{/* Address Line */}
										<div className="col-lg-6 mb-3">
											<label className="text-label text-primary">
												Address Line <span className="required">*</span>
											</label>
											<input
												type="text"
												id="addressLine"
												className="form-control"
												value={formData.addressLine}
												onChange={handleChange}
											/>
											{errors.addressLine && (
												<small className="text-danger">
													{errors.addressLine}
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
												id="city"
												className="form-control"
												value={formData.city}
												onChange={handleChange}
											/>
											{errors.city && (
												<small className="text-danger">{errors.city}</small>
											)}
										</div>

										{/* State */}
										<div className="col-lg-6 mb-3">
											<label className="text-label text-primary">
												State <span className="required">*</span>
											</label>
											<input
												type="text"
												id="state"
												className="form-control"
												value={formData.state}
												onChange={handleChange}
											/>
											{errors.state && (
												<small className="text-danger">{errors.state}</small>
											)}
										</div>

										{/* PIN Code */}
										<div className="col-lg-6 mb-3">
											<label className="text-label text-primary">
												PIN Code <span className="required">*</span>
											</label>
											<input
												type="text"
												id="postalCode"
												className="form-control"
												maxLength={6}
												value={formData.postalCode}
												onChange={handleChange}
											/>
											{errors.postalCode && (
												<small className="text-danger">
													{errors.postalCode}
												</small>
											)}
										</div>

										{/* Country */}
										<div className="col-lg-6 mb-3">
											<label className="text-label text-primary">
												Country <span className="required">*</span>
											</label>
											<input
												type="text"
												id="country"
												className="form-control"
												value={formData.country}
												onChange={handleChange}
											/>
											{errors.country && (
												<small className="text-danger">{errors.country}</small>
											)}
										</div>

										{/* Area of Training */}
										<div className="col-lg-6 mb-3">
											<label className="text-label text-primary">
												Area of Training <span className="required">*</span>
											</label>
											<input
												type="text"
												id="areaOfTraining"
												className="form-control"
												value={formData.areaOfTraining}
												onChange={handleChange}
											/>
											{errors.areaOfTraining && (
												<small className="text-danger">
													{errors.areaOfTraining}
												</small>
											)}
										</div>

										{/* Number of Hours */}
										<div className="col-lg-6 mb-3">
											<label className="text-label text-primary">
												Number of Hours <span className="required">*</span>
											</label>
											<input
												type="number"
												id="numberOfHours"
												className="form-control"
												value={formData.numberOfHours}
												onChange={handleChange}
											/>
											{errors.numberOfHours && (
												<small className="text-danger">
													{errors.numberOfHours}
												</small>
											)}
										</div>

										{/* Number of Days */}
										<div className="col-lg-6 mb-3">
											<label className="text-label text-primary">
												Number of Days <span className="required">*</span>
											</label>
											<input
												type="number"
												id="numberOfDays"
												className="form-control"
												value={formData.numberOfDays}
												onChange={handleChange}
											/>
											{errors.numberOfDays && (
												<small className="text-danger">
													{errors.numberOfDays}
												</small>
											)}
										</div>

										{/* Price Per Session */}
										<div className="col-lg-6 mb-3">
											<label className="text-label text-primary">
												Price Per Session <span className="required">*</span>
											</label>
											<input
												type="number"
												id="pricePerSession"
												className="form-control"
												value={formData.pricePerSession}
												onChange={handleChange}
												step="0.01"
											/>
											{errors.pricePerSession && (
												<small className="text-danger">
													{errors.pricePerSession}
												</small>
											)}
										</div>

										{/* Price Per Day */}
										<div className="col-lg-6 mb-3">
											<label className="text-label text-primary">
												Price Per Day <span className="required">*</span>
											</label>
											<input
												type="number"
												id="pricePerDay"
												className="form-control"
												value={formData.pricePerDay}
												onChange={handleChange}
												step="0.01"
											/>
											{errors.pricePerDay && (
												<small className="text-danger">
													{errors.pricePerDay}
												</small>
											)}
										</div>

										{/* Training Level */}
										<div className="col-lg-6 mb-3">
											<label className="text-label text-primary">
												Training Level <span className="required">*</span>
											</label>
											<input
												type="text"
												id="trainingLevel"
												className="form-control"
												value={formData.trainingLevel}
												onChange={handleChange}
											/>
											{errors.trainingLevel && (
												<small className="text-danger">
													{errors.trainingLevel}
												</small>
											)}
										</div>

										{/* Number of People */}
										<div className="col-lg-6 mb-3">
											<label className="text-label text-primary">
												Number of People <span className="required">*</span>
											</label>
											<input
												type="number"
												id="numberOfPeopleToTrain"
												className="form-control"
												value={formData.numberOfPeopleToTrain}
												onChange={handleChange}
											/>
											{errors.numberOfPeopleToTrain && (
												<small className="text-danger">
													{errors.numberOfPeopleToTrain}
												</small>
											)}
										</div>

										{/* Number of Batches */}
										<div className="col-lg-6 mb-3">
											<label className="text-label text-primary">
												Number of Batches <span className="required">*</span>
											</label>
											<input
												type="number"
												id="numberOfBatches"
												className="form-control"
												value={formData.numberOfBatches}
												onChange={handleChange}
											/>
											{errors.numberOfBatches && (
												<small className="text-danger">
													{errors.numberOfBatches}
												</small>
											)}
										</div>

										{/* Time */}
										<div className="col-lg-6 mb-3">
											<label className="text-label text-primary">
												Time <span className="required">*</span>
											</label>
											<input
												type="time"
												id="time"
												className="form-control"
												value={formData.time}
												onChange={handleChange}
											/>
											{errors.time && (
												<small className="text-danger">{errors.time}</small>
											)}
										</div>

										{/* Day */}
										<div className="col-lg-6 mb-3">
											<label className="text-label text-primary">
												Day <span className="required">*</span>
											</label>
											<input
												type="text"
												id="day"
												className="form-control"
												value={formData.day}
												onChange={handleChange}
											/>
											{errors.day && (
												<small className="text-danger">{errors.day}</small>
											)}
										</div>

										{/* Month (Month Picker) */}
										<div className="col-lg-6 mb-3">
											<label className="text-label text-primary">
												Month <span className="required">*</span>
											</label>
											<DatePicker
												selected={selectedMonthDate}
												onChange={handleMonthChange}
												dateFormat="MMMM yyyy"
												showMonthYearPicker
												showFullMonthYearPicker
												className="form-control"
											/>
											{errors.month && (
												<small className="text-danger">{errors.month}</small>
											)}
										</div>

										{/* FACILITIES (nested interface) */}
										<div className="col-12 mb-3">
											<label className="text-label text-primary">
												Facilities <span className="required">*</span>
											</label>
											<div className="d-flex flex-wrap gap-3">
												{/* Food */}
												<div className="form-check form-check-inline">
													<input
														className="form-check-input"
														type="checkbox"
														id="Food"
														checked={!!formData.facilities.Food}
														onChange={handleChange}
													/>
													<label className="form-check-label" htmlFor="Food">
														Food
													</label>
												</div>
												{/* Travel */}
												<div className="form-check form-check-inline">
													<input
														className="form-check-input"
														type="checkbox"
														id="Travel"
														checked={!!formData.facilities.Travel}
														onChange={handleChange}
													/>
													<label className="form-check-label" htmlFor="Travel">
														Travel
													</label>
												</div>
												{/* Accommodation */}
												<div className="form-check form-check-inline">
													<input
														className="form-check-input"
														type="checkbox"
														id="Accommodation"
														checked={!!formData.facilities.Accommodation}
														onChange={handleChange}
													/>
													<label
														className="form-check-label"
														htmlFor="Accommodation">
														Accommodation
													</label>
												</div>
												{/* Other */}
												<div className="form-check form-check-inline">
													<input
														className="form-check-input"
														type="checkbox"
														id="other"
														checked={!!formData.facilities.other}
														onChange={handleChange}
													/>
													<label className="form-check-label" htmlFor="other">
														Other
													</label>
												</div>
											</div>
										</div>

										{/* OTHER DETAILS if 'other' is checked */}
										{formData.facilities.other && (
											<div className="col-12 mb-3">
												<label className="text-label text-primary">
													Please specify <span className="required">*</span>
												</label>
												<input
													type="text"
													id="otherDetails"
													className="form-control"
													value={formData.facilities.otherDetails || ""}
													onChange={handleChange}
												/>
												{errors.otherDetails && (
													<small className="text-danger">
														{errors.otherDetails}
													</small>
												)}
											</div>
										)}
										{/* Accommodation */}
										<div className="form-check form-check-inline">
											<input
												className="form-check-input"
												type="checkbox"
												id="Estimates"
												checked={!!formData.facilities.Accommodation}
												onChange={handleChange}
											/>
											<label
												className="form-check-label"
												htmlFor="Accommodation">
												Estimates
											</label>
										</div>

										{/* Submit button */}
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
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AddNewEnquiry;
