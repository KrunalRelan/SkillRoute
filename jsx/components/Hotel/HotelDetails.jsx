import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { SVGICON } from "../Dashboard/Content";
import { getHotelById } from "../../../services/HotelService";

// You may want to replace these with actual image imports if available
import avatar1 from "../../../assets/images/avatar/1.jpg";
import avatar2 from "../../../assets/images/avatar/2.jpg";
import avatar3 from "../../../assets/images/avatar/3.jpg";

const HotelDetails = () => {
  const { id } = useParams(); // Get hotel id from URL
  const [hotelInfo, setHotelInfo] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        setIsLoading(true);
        const data = await getHotelById(Number(id));
        setHotelInfo(data);
      } catch (err) {
        console.error("Error fetching hotel details:", err);
        setError(err.message || "Failed to retrieve hotel details");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchHotelDetails();
    }
  }, [id]);

  if (isLoading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center mt-5">Error: {error}</div>;
  if (!hotelInfo)
    return <div className="text-center mt-5">No hotel data found</div>;

  // Join the location fields into a single string.
  const locationString = [
    hotelInfo.addressLine,
    hotelInfo.city,
    hotelInfo.state,
    hotelInfo.pinCode,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="row">
      {/* Left Column: Hotel Details */}
      <div className="col-xl-9">
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Hotel Details</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-xl-12">
                <div className="hotel-info mb-4">
                  <h3 className="text-primary">{hotelInfo.name}</h3>
                  <div className="row mt-4">
                    <div className="col-md-6">
                      <div className="info-item mb-3">
                        <i className="fas fa-envelope me-2 text-primary"></i>
                        <span className="fw-bold">Email:</span>{" "}
                        {hotelInfo.email}
                      </div>
                      <div className="info-item mb-3">
                        <i className="fas fa-map-marker-alt me-2 text-primary"></i>
                        <span className="fw-bold">Location:</span>{" "}
                        {locationString || "N/A"}
                      </div>
                      <div className="info-item mb-3">
                        <i className="fas fa-users me-2 text-primary"></i>
                        <span className="fw-bold">Maximum Capacity:</span>{" "}
                        {hotelInfo.maxNoOfPax} people
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="info-item mb-3">
                        <i className="fas fa-door-closed me-2 text-primary"></i>
                        <span className="fw-bold">Total Rooms:</span>{" "}
                        {hotelInfo.totalRooms}
                      </div>
                      <div className="info-item mb-3">
                        <i className="fas fa-dollar-sign me-2 text-primary"></i>
                        <span className="fw-bold">Price per Room:</span>{" "}
                        {hotelInfo.pricePerRoom
                          ? `$${hotelInfo.pricePerRoom}`
                          : "N/A"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="facilities-section">
                  <h4 className="mb-3">Facilities</h4>
                  <div className="d-flex flex-wrap gap-2">
                    {hotelInfo.facilities &&
                      hotelInfo.facilities.map((facility, idx) => (
                        <span
                          key={idx}
                          className="badge badge-primary"
                          style={{
                            padding: "8px 16px",
                            fontSize: "14px",
                            borderRadius: "20px",
                            margin: "4px",
                          }}
                        >
                          {facility}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: (Optional) */}
    </div>
  );
};

export default HotelDetails;
