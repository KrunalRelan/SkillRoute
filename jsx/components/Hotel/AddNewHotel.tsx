import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toast, ProgressBar } from "react-bootstrap";
import { HotelRegistration } from "../../models/HotelRegistrationModel";
import { hotelRegistration } from "../../../services/HotelService";

/** Utility function to read a file as base64 string */
const convertFileToBase64 = (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			if (typeof reader.result === "string") {
				resolve(reader.result);
			} else {
				reject("File could not be read as base64.");
			}
		};
		reader.onerror = (error) => reject(error);
	});
};

const AddNewHotel: React.FC = () => {
	// Form data (matches HotelRegistration model)
	const [formData, setFormData] = useState<HotelRegistration>({
		id: null,
		name: "",
		addressLine: "",
		city: "",
		state: "",
		pinCode: "",
		maxNoOfPax: 0,
		totalRooms: 0,
		pricePerRoom: 0,
		facilities: [],
		imagePath: null,
		email: null,
	});

	// Store the file separately for preview
	const [file, setFile] = useState<File | null>(null);

	// React Bootstrap Toast & Progress
	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState("Saving hotel...");
	const [progress, setProgress] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	// Errors
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	// Navigation
	const navigate = useNavigate();

	// Facility options (checkboxes)
	const facilityOptions: string[] = [
		"Conference Rooms",
		"High-speed WiFi",
		"Projector",
		"Meals",
		"Audio System",
		"Breakout Rooms",
		"Video Conferencing",
		"Whiteboard",
		"Pool",
		"Gym",
		"Spa",
		"Parking",
		"Transportation",
		"Grounds",
	];

	/** Handle text/number inputs */
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { id, value } = e.target;

		// If numeric fields
		if (["maxNoOfPax", "totalRooms"].includes(id)) {
			setFormData((prev) => ({
				...prev,
				[id]: parseInt(value) || 0,
			}));
		} else {
			setFormData((prev) => ({ ...prev, [id]: value }));
		}
	};

	/** Handle facility checkbox toggles */
	const handleFacilityCheckbox = (facility: string) => {
		setFormData((prev) => {
			const isChecked = prev.facilities.includes(facility);
			return {
				...prev,
				facilities: isChecked
					? prev.facilities.filter((f) => f !== facility)
					: [...prev.facilities, facility],
			};
		});
	};

	/** Handle file change and show preview */
	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const selectedFile = e.target.files[0];
			setFile(selectedFile);

			// Convert to base64 if you want to store the image in formData.image
			try {
				const base64Img = await convertFileToBase64(selectedFile);
				setFormData((prev) => ({
					...prev,
					image: base64Img,
				}));
			} catch (err) {
				console.error("Error converting file to base64", err);
			}
		}
	};

	/** Remove file preview */
	const removeFile = () => {
		setFile(null);
		setFormData((prev) => ({
			...prev,
			image: null,
		}));
	};

	/** Validate form fields */
	const validateForm = (): { [key: string]: string } => {
		const newErrors: { [key: string]: string } = {};

		if (!formData.name.trim()) {
			newErrors.name = "Hotel name is required.";
		}
		if (!formData.addressLine?.trim()) {
			newErrors.addressLine = "Address line is required.";
		}
		if (!formData.city?.trim()) {
			newErrors.city = "City is required.";
		}
		if (!formData.state?.trim()) {
			newErrors.state = "State is required.";
		}
		if (!formData.pinCode?.trim()) {
			newErrors.pinCode = "PIN code is required.";
		}
		if (formData.maxNoOfPax <= 0) {
			newErrors.maxNoOfPax = "Max No. of Pax must be greater than 0.";
		}
		if (formData.totalRooms <= 0) {
			newErrors.totalRooms = "Total rooms must be greater than 0.";
		}
		if ((formData.pricePerRoom ?? 0) <= 0) {
			newErrors.pricePerRoom = "Price per room is required.";
		}
		if (formData.facilities.length === 0) {
			newErrors.facilities = "Select at least one facility.";
		}
		if (!formData.email?.trim()) {
			newErrors.email = "Email is required.";
		}
		return newErrors;
	};

	/** Handle form submission */
	const handleSubmit = async () => {
		const formErrors = validateForm();
		if (Object.keys(formErrors).length > 0) {
			setErrors(formErrors);
			return;
		}
		setErrors({});

		try {
			// Show loading toast
			setIsLoading(true);
			setShowToast(true);
			setToastMessage("Saving hotel...");
			setProgress(0);

			// Simulate progress
			const progressInterval = setInterval(() => {
				setProgress((oldProg) => {
					if (oldProg >= 100) {
						clearInterval(progressInterval);
						return 100;
					}
					return oldProg + 10;
				});
			}, 200);

			// Call the API
			const response = await hotelRegistration(formData);
			console.log("Hotel saved successfully:", response.data);

			// Once successful, finish progress
			clearInterval(progressInterval);
			setProgress(100);
			setToastMessage("Hotel saved successfully!");

			// Delay for user to see success
			setTimeout(() => {
				setShowToast(false);
				navigate("/hotel");
			}, 1000);
		} catch (error) {
			console.error("Error saving hotel:", error);
			setToastMessage("Error saving hotel. Please try again.");
			setProgress(100);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			{/* TOAST + PROGRESS OVERLAY */}
			{showToast && (
				<div
					className="d-flex justify-content-center align-items-center"
					style={{
						position: "fixed",
						top: 0,
						left: 0,
						width: "100vw",
						height: "100vh",
						backgroundColor: "rgba(0,0,0,0.3)",
						zIndex: 9999,
					}}>
					<Toast show={showToast} onClose={() => setShowToast(false)}>
						<Toast.Header>
							<strong className="me-auto">Hotel Registration Status</strong>
						</Toast.Header>
						<Toast.Body>
							{isLoading ? (
								<>
									<p>{toastMessage}</p>
									<ProgressBar animated now={progress} />
								</>
							) : (
								<p>{toastMessage}</p>
							)}
						</Toast.Body>
					</Toast>
				</div>
			)}
			{/* FORM */}
			<div className="container-fluid p-0">
				<div className="row g-0">
					<div className="col-12">
						<div className="card w-100 border-0 rounded-0">
							<div className="card-header bg-primary text-white">
								<h4 className="card-title mb-0 text-white">Add New Hotel</h4>
							</div>
							<div className="card-body">
								<form>
									<div className="row">
										{/* Hotel Name */}
										<div className="col-lg-6 mb-3">
											<label className="text-label text-primary">
												Hotel Name <span className="required">*</span>
											</label>
											<input
												type="text"
												id="name"
												className="form-control"
												value={formData.name}
												onChange={handleChange}
											/>
											{errors.name && (
												<small className="text-danger d-block">
													{errors.name}
												</small>
											)}
										</div>
										{/* Email */}
										<div className="col-lg-6 mb-3">
											<label className="text-label text-primary">
												Email <span className="required">*</span>
											</label>
											<input
												type="text"
												id="email"
												className="form-control"
												value={formData.email ?? ""}
												onChange={handleChange}
											/>
											{errors.name && (
												<small className="text-danger d-block">
													{errors.email}
												</small>
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
												value={formData.addressLine ?? ""}
												onChange={handleChange}
											/>
											{errors.addressLine && (
												<small className="text-danger d-block">
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
												value={formData.city ?? ""}
												onChange={handleChange}
											/>
											{errors.city && (
												<small className="text-danger d-block">
													{errors.city}
												</small>
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
												value={formData.state ?? ""}
												onChange={handleChange}
											/>
											{errors.state && (
												<small className="text-danger d-block">
													{errors.state}
												</small>
											)}
										</div>

										{/* PIN Code */}
										<div className="col-lg-6 mb-3">
											<label className="text-label text-primary">
												PIN Code <span className="required">*</span>
											</label>
											<input
												type="text"
												id="pinCode"
												className="form-control"
												maxLength={6}
												value={formData.pinCode ?? ""}
												onChange={handleChange}
											/>
											{errors.pinCode && (
												<small className="text-danger d-block">
													{errors.pinCode}
												</small>
											)}
										</div>

										{/* Max No. of Pax */}
										<div className="col-lg-6 mb-3">
											<label className="text-label text-primary">
												Max No. of Pax <span className="required">*</span>
											</label>
											<input
												type="number"
												id="maxNoOfPax"
												className="form-control"
												value={formData.maxNoOfPax}
												onChange={handleChange}
											/>
											{errors.maxNoOfPax && (
												<small className="text-danger d-block">
													{errors.maxNoOfPax}
												</small>
											)}
										</div>

										{/* Total Rooms */}
										<div className="col-lg-6 mb-3">
											<label className="text-label text-primary">
												Total Rooms <span className="required">*</span>
											</label>
											<input
												type="number"
												id="totalRooms"
												className="form-control"
												value={formData.totalRooms}
												onChange={handleChange}
											/>
											{errors.totalRooms && (
												<small className="text-danger d-block">
													{errors.totalRooms}
												</small>
											)}
										</div>

										{/* Price Per Room */}
										<div className="col-lg-6 mb-3">
											<label className="text-label text-primary">
												Price Per Room <span className="required">*</span>
											</label>
											<input
												type="text"
												id="pricePerRoom"
												className="form-control"
												value={formData.pricePerRoom ?? ""}
												onChange={handleChange}
											/>
											{errors.pricePerRoom && (
												<small className="text-danger d-block">
													{errors.pricePerRoom}
												</small>
											)}
										</div>

										{/* FACILITIES CHECKBOXES */}
										<div className="col-lg-6 mb-3">
											<label className="text-label text-primary">
												Facilities
											</label>
											<div className="d-flex flex-wrap gap-3">
												{facilityOptions.map((facility, idx) => (
													<div key={idx} className="form-check">
														<input
															type="checkbox"
															className="form-check-input"
															id={`facility-${idx}`}
															checked={formData.facilities.includes(facility)}
															onChange={() => handleFacilityCheckbox(facility)}
														/>
														<label
															className="form-check-label"
															htmlFor={`facility-${idx}`}>
															{facility}
														</label>
													</div>
												))}
											</div>
										</div>

										{/* IMAGE UPLOAD with PREVIEW */}
										<div className="col-lg-6 mb-3">
											<label className="text-label text-primary">
												Hotel Image
											</label>
											<div style={{ marginBottom: "1rem" }}>
												{/* Preview box */}
												<div
													style={{
														width: "150px",
														height: "150px",
														border: "1px solid #ddd",
														borderRadius: "8px",
														backgroundSize: "cover",
														backgroundPosition: "center",
														backgroundImage: file
															? `url(${URL.createObjectURL(file)})`
															: "url(https://via.placeholder.com/150)",
													}}
												/>
											</div>

											{/* Upload / Remove buttons */}
											<div className="mb-2">
												<input
													type="file"
													className="form-control d-none"
													id="imageUpload"
													accept=".png, .jpg, .jpeg"
													onChange={handleFileChange}
												/>
												<label
													htmlFor="imageUpload"
													className="btn btn-primary btn-sm">
													Upload
												</label>
												{file && (
													<button
														type="button"
														className="btn btn-danger btn-sm ms-2"
														onClick={removeFile}>
														Remove
													</button>
												)}
											</div>
										</div>

										{/* SUBMIT */}
										<div className="col-12">
											<button
												type="button"
												className="btn btn-primary"
												onClick={handleSubmit}
												disabled={isLoading || showToast}>
												Submit
											</button>
										</div>
									</div>{" "}
									{/* end row */}
								</form>
							</div>{" "}
							{/* end card-body */}
						</div>{" "}
						{/* end card */}
					</div>{" "}
					{/* end col-12 */}
				</div>{" "}
				{/* end row */}
			</div>{" "}
			{/* end container-fluid */}
		</>
	);
};

export default AddNewHotel;
