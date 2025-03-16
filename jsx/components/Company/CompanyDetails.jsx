import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import GenericTable from "../GenericTable"; // Adjust path as needed
import { getCompanyById } from "../../../services/CompanyService";
import { IMAGES, SVGICON } from "../Dashboard/Content";
import locationIcon from "./../../../assets/images/svg/location.svg";
import phoneIcon from "./../../../assets/images/svg/phone.svg";
import emailIcon from "./../../../assets/images/svg/email.svg";

const CompanyDetails = () => {
  const { id } = useParams(); // Company ID from the route parameter
  const [companyDetails, setCompanyDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const didFetchRef = useRef(false);

  // Fetch company details (including its enquiries) only once
  useEffect(() => {
    if (didFetchRef.current) return;
    didFetchRef.current = true;

    const fetchCompany = async () => {
      try {
        setIsLoading(true);
        const data = await getCompanyById(Number(id));
        setCompanyDetails(data);
      } catch (err) {
        console.error("Error fetching company details:", err);
        setError(err.message || "Failed to fetch company details");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchCompany();
    }
  }, [id]);

  // Use the correct property name from the API response ("enquiries")
  const enquiries = companyDetails?.enquiries || [];

  // Define columns for the enquiries table based on your Enquiry model
  const enquiryColumns = [
    { field: "companyName", headerName: "Company", align: "left" },
    { field: "enquirerName", headerName: "Enquirer", align: "left" },
    { field: "location", headerName: "Location", align: "left" },
    { field: "email", headerName: "Email", align: "left" },
    { field: "areaOfTraining", headerName: "Area of Training", align: "left" },
    { field: "numberOfHours", headerName: "Hours", align: "right" },
    { field: "numberOfDays", headerName: "Days", align: "right" },
    {
      field: "pricePerSession",
      headerName: "Price/Session",
      align: "right",
      render: (value) => `$${value}`,
    },
    {
      field: "pricePerDay",
      headerName: "Price/Day",
      align: "right",
      render: (value) => `$${value}`,
    },
    { field: "trainingLevel", headerName: "Level", align: "center" },
    { field: "numberOfPeopleToTrain", headerName: "People", align: "right" },
    { field: "numberOfBatches", headerName: "Batches", align: "right" },
    { field: "time", headerName: "Time", align: "center" },
    { field: "day", headerName: "Day", align: "center" },
    { field: "month", headerName: "Month", align: "center" },
  ];

  if (isLoading) {
    return <div className="text-center mt-5">Loading...</div>;
  }
  if (error) {
    return <div className="text-center mt-5">Error: {error}</div>;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          {/* Company Details Card */}
          <div className="card mb-4">
            <div className="card-header p-0">
              <div className="user-bg w-100">
                {/* Optional background SVGs */}
                <div className="user-svg">
                  <svg
                    width="264"
                    height="109"
                    viewBox="0 0 264 109"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.01"
                      y="0.65"
                      width="263.59"
                      height="275.13"
                      rx="20"
                      fill="#FCC43E"
                    />
                  </svg>
                </div>
                <div className="user-svg-1">
                  <svg
                    width="264"
                    height="59"
                    viewBox="0 0 264 59"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      y="0.56"
                      width="263.59"
                      height="275.13"
                      rx="20"
                      fill="#FB7D5B"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="card-body text-center">
              {/* Avatar Image */}
              <img
                src={companyDetails.image || IMAGES.avat9}
                alt="Company Avatar"
                className="avatar avatar-xxl mb-3"
              />
              {/* Company Name displayed below the avatar; shows actual name if available, else fallback text */}
              <h2 className="mb-3">
                {companyDetails?.companyName
                  ? companyDetails.companyName
                  : "Company Details"}
              </h2>
              {/* Basic Details */}
              <div className="row mt-2">
                <div className="col-md-4">
                  <ul className="list-unstyled d-flex align-items-center justify-content-center">
                    <li className="me-2">
                      <img
                        src={locationIcon}
                        alt="Location"
                        style={{ width: "40px", height: "40px" }}
                      />
                    </li>
                    <li>
                      <span>Address:</span>
                      <h5 className="mb-0">
                        {companyDetails.address || "N/A"}
                      </h5>
                    </li>
                  </ul>
                </div>
                <div className="col-md-4">
                  <ul className="list-unstyled d-flex align-items-center justify-content-center">
                    <li className="me-2">
                      <img
                        src={phoneIcon}
                        alt="Phone"
                        style={{ width: "40px", height: "40px" }}
                      />
                    </li>
                    <li>
                      <span>Phone:</span>
                      <h5 className="mb-0">{companyDetails.phone || "N/A"}</h5>
                    </li>
                  </ul>
                </div>
                <div className="col-md-4">
                  <ul className="list-unstyled d-flex align-items-center justify-content-center">
                    <li className="me-2">
                      <img
                        src={emailIcon}
                        alt="Email"
                        style={{ width: "40px", height: "40px" }}
                      />
                    </li>
                    <li>
                      <span>Email:</span>
                      <h5 className="mb-0">{companyDetails.email || "N/A"}</h5>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Enquiries Table Card */}
          <div className="card mb-4">
            <div className="card-header border-0 p-3">
              <h4 className="heading mb-0">Enquiries</h4>
            </div>
            <div className="card-body p-0">
              {/* Horizontal scroll wrapper with dark scrollbar */}
              <div style={{ overflowX: "auto" }}>
                <GenericTable
                  columns={enquiryColumns}
                  data={enquiries}
                  title="Enquiries"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
