import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { TrainerRegistration } from "../../models/TrainerRegistration";
import { getTrainerById } from "../../../services/TrainerService";
// import your icons/images as needed
import { IMAGES, SVGICON } from "../Dashboard/Content";

const TrainersDetail: React.FC = () => {
  // 1. Read the 'id' from the URL (e.g. /trainers/123)
  const { id } = useParams();

  // 2. Keep trainer data in state
  const [trainer, setTrainer] = useState<TrainerRegistration | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // 3. Fetch trainer on mount or when 'id' changes
  useEffect(() => {
    if (!id) return; // if no id in URL, do nothing or handle error
    fetchTrainerData(parseInt(id, 10));
  }, [id]);

  const fetchTrainerData = async (trainerId: number) => {
    try {
      setLoading(true);
      const data = await getTrainerById(trainerId);
      setTrainer(data);
      setError("");
    } catch (err) {
      console.error("Error fetching trainer:", err);
      setError("Failed to fetch trainer details.");
    } finally {
      setLoading(false);
    }
  };

  // 4. If loading or error, show something
  if (loading) {
    return <div>Loading trainer data...</div>;
  }
  if (error) {
    return <div className="text-danger">{error}</div>;
  }
  if (!trainer) {
    return <div>Trainer not found.</div>; // or handle 404
  }

  // 5. Render the trainer info
  // We adapt the original UI to use the real trainer data from the API
  // e.g. trainer.name, trainer.experience, etc.

  // Example: If your API returns "topTrainingAreas" as a string, you might want
  // to split it by commas into an array. For now, let's assume it's already
  // an array or we do something like:
  const areasOfTraining = trainer.topTrainingAreas
    ? trainer.topTrainingAreas.split(",").map((a) => a.trim())
    : [];

  // We'll keep "role" as just "Trainer" or something if it's not provided by the API
  const role = "Technical Trainer";

  // Basic details array
  const basicDetail = [
    { title: "Email", subtitle: trainer.email, image: "email-icon" },
    { title: "Location", subtitle: trainer.location, image: "location-icon" },
    {
      title: "Experience",
      subtitle: `${trainer.experience} years`,
      image: "experience-icon",
    },
    {
      title: "Specialisation",
      subtitle: trainer.specialisation,
      image: "specialisation-icon",
    },
  ];

  return (
    <div className="row">
      <div className="col-xl-12">
        <div className="card">
          {/* Banner / Header */}
          <div className="card-header p-0">
            <div className="user-bg w-100">
              <div className="user-svg">
                {/* You can keep your existing SVG or images here */}
                {SVGICON.user}
              </div>
              <div className="user-svg-1">{SVGICON.user2}</div>
            </div>
          </div>

          {/* Body */}
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <div className="user">
                <div className="user-media">
                  <img
                    src={IMAGES.avat8}
                    alt=""
                    className="avatar avatar-xxl"
                  />
                </div>
                <div>
                  <h2 className="mb-0">{trainer.name}</h2>
                  <p className="text-primary font-w600">{role}</p>
                </div>
              </div>
              <Dropdown className="custom-dropdown">
                <Dropdown.Toggle as="div" className="i-false btn sharp tp-btn">
                  {SVGICON.dots}
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-end" align="end">
                  <Dropdown.Item>Edit Profile</Dropdown.Item>
                  <Dropdown.Item>Settings</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {/* Basic Detail */}
            <div className="row mt-4">
              {basicDetail.map((item, ind) => (
                <div className="col-xl-3 col-xxl-6 col-sm-6" key={ind}>
                  <ul className="student-details">
                    <li className="me-2">
                      <Link to={"#"} className="icon-box bg-secondary">
                        <i className={`fa fa-${item.image}`}></i>
                      </Link>
                    </li>
                    <li>
                      <span>{item.title}:</span>
                      <h5 className="mb-0">{item.subtitle || "N/A"}</h5>
                    </li>
                  </ul>
                </div>
              ))}
            </div>

            {/* Areas of Training */}
            <div className="row mt-4">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Areas of Training</h4>
                  </div>
                  <div className="card-body">
                    <div className="d-flex flex-wrap gap-2">
                      {areasOfTraining.map((area, index) => (
                        <span key={index} className="badge badge-primary">
                          {area}
                        </span>
                      ))}
                      {/* If no areas, display something else */}
                      {areasOfTraining.length === 0 && (
                        <span>No training areas specified.</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Session Details */}
            <div className="row mt-4">
              <div className="col-xl-6">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Session Details</h4>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between">
                        <span>Price per Session:</span>
                        <strong>${trainer.pricePerSession?.toFixed(2)}</strong>
                      </li>
                      <li className="list-group-item d-flex justify-content-between">
                        <span>Hours per Session:</span>
                        <strong>{trainer.hoursPerSession}</strong>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* If you want more fields, add them here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainersDetail;
