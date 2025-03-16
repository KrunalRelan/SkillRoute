import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toast, ProgressBar } from "react-bootstrap";
import { TrainerRegistration } from "../../models/TrainerRegistration";
import { saveTrainer } from "../../../services/TrainerService";

const AddNewTrainer: React.FC = () => {
  // STATE
  const [formData, setFormData] = useState<TrainerRegistration>({
    trainerId: null, // Add this line
    name: "",
    email: "",
    experience: 0,
    pricePerSession: 0,
    hoursPerSession: 0,
    profileImage: "", // We'll store the URL here
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("Saving trainer...");
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // NAVIGATION
  const navigate = useNavigate();

  // HANDLE INPUT CHANGES
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    // If numeric
    if (["experience", "pricePerSession", "hoursPerSession"].includes(id)) {
      setFormData((prev) => ({
        ...prev,
        [id]: parseFloat(value) || 0,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  // VALIDATION
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (formData.experience < 0) {
      newErrors.experience = "Experience cannot be negative";
    }
    if (formData.pricePerSession < 0) {
      newErrors.pricePerSession = "Price per session cannot be negative";
    }
    if (formData.hoursPerSession < 0) {
      newErrors.hoursPerSession = "Hours per session cannot be negative";
    }

    return newErrors;
  };

  // SUBMIT
  const handleSubmit = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setErrors({});

    try {
      setIsLoading(true);
      setShowToast(true);
      setToastMessage("Saving trainer...");

      // Simulate progress
      setProgress(0);
      const progressInterval = setInterval(() => {
        setProgress((oldProg) => {
          if (oldProg >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return oldProg + 10;
        });
      }, 200);

      // Make the API call (JSON only)
      const trainerId = await saveTrainer(formData);

      clearInterval(progressInterval);
      setProgress(100);
      setToastMessage("Trainer saved successfully!");

      setTimeout(() => {
        setShowToast(false);
        navigate(`/trainer-detail/${trainerId}`);
      }, 1000);
    } catch (error) {
      console.error("Error saving trainer:", error);
      setToastMessage("Error saving trainer. Please try again.");
      setProgress(100);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toast */}
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
          }}
        >
          <Toast show={showToast} onClose={() => setShowToast(false)}>
            <Toast.Header>
              <strong className="me-auto">Trainer Status</strong>
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

      {/* Form */}
      <div className="container-fluid p-0">
        <div className="row g-0">
          <div className="col-12">
            <div className="card w-100 border-0 rounded-0">
              <div className="card-header bg-primary text-white">
                <h4 className="card-title mb-0 text-white">Add New Trainer</h4>
              </div>
              <div className="card-body">
                <form>
                  <div className="row">
                    {/* Name */}
                    <div className="col-lg-6 mb-3">
                      <label className="text-label text-primary">
                        Name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      {errors.name && (
                        <small className="text-danger">{errors.name}</small>
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

                    {/* Location */}
                    <div className="col-lg-6 mb-3">
                      <label className="text-label text-primary">
                        Location
                      </label>
                      <input
                        type="text"
                        id="location"
                        className="form-control"
                        value={formData.location || ""}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Experience (Years) */}
                    <div className="col-lg-6 mb-3">
                      <label className="text-label text-primary">
                        Experience (Years)
                      </label>
                      <input
                        type="number"
                        id="experience"
                        className="form-control"
                        value={formData.experience}
                        onChange={handleChange}
                      />
                      {errors.experience && (
                        <small className="text-danger">
                          {errors.experience}
                        </small>
                      )}
                    </div>

                    {/* Specialisation */}
                    <div className="col-lg-6 mb-3">
                      <label className="text-label text-primary">
                        Specialisation
                      </label>
                      <input
                        type="text"
                        id="specialisation"
                        className="form-control"
                        value={formData.specialisation || ""}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Top Training Areas */}
                    <div className="col-lg-6 mb-3">
                      <label className="text-label text-primary">
                        Top Training Areas
                      </label>
                      <textarea
                        id="topTrainingAreas"
                        className="form-control"
                        rows={3}
                        value={formData.topTrainingAreas || ""}
                        onChange={handleChange}
                      />
                    </div>

                    {/* Price Per Session */}
                    <div className="col-lg-6 mb-3">
                      <label className="text-label text-primary">
                        Price Per Session
                      </label>
                      <input
                        type="number"
                        id="pricePerSession"
                        className="form-control"
                        step="0.01"
                        value={formData.pricePerSession}
                        onChange={handleChange}
                      />
                      {errors.pricePerSession && (
                        <small className="text-danger">
                          {errors.pricePerSession}
                        </small>
                      )}
                    </div>

                    {/* Hours Per Session */}
                    <div className="col-lg-6 mb-3">
                      <label className="text-label text-primary">
                        Hours Per Session
                      </label>
                      <input
                        type="number"
                        id="hoursPerSession"
                        className="form-control"
                        value={formData.hoursPerSession}
                        onChange={handleChange}
                      />
                      {errors.hoursPerSession && (
                        <small className="text-danger">
                          {errors.hoursPerSession}
                        </small>
                      )}
                    </div>

                    {/* Profile Image URL */}
                    {/* <div className="col-lg-12 mb-3">
                      <label className="text-label text-primary">
                        Profile Image URL
                      </label>
                      <input
                        type="text"
                        id="profileImageUrl"
                        className="form-control"
                        value={formData.profileImage || ""}
                        onChange={handleChange}
                      />
                      {/* Show preview if URL is valid and not empty
                      {formData.profileImage && (
                        <div className="mt-3">
                          <img
                            src={formData.profileImage}
                            alt="Preview"
                            style={{
                              maxWidth: "200px",
                              maxHeight: "200px",
                              objectFit: "cover",
                              borderRadius: "4px",
                            }}
                          />
                        </div>
                      )}
                    </div> */}

                    {/* Submit Button */}
                    <div className="col-12">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSubmit}
                        disabled={isLoading || showToast}
                      >
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

export default AddNewTrainer;
