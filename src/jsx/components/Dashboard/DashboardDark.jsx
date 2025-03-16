import React, { useState, useContext, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";

// Import Components
import { ThemeContext } from "../../../context/ThemeContext";
import { SVGICON } from "./Content";
// Removed the old "TrainerDetails" import you had commented out
import { UnpaidCompanyTable } from "./Elements/UnpaidCompanyTable";
import { useNavigate } from "react-router-dom";
import { getAllEnquiries } from "../../../services/CompanyService";

// 1) IMPORT your trainer service
import { getAllTrainers } from "../../../services/TrainerService";
import { getAllHotels } from "../../../services/HotelService";
import { getAllCompanies } from "../../../services/CompanyService";
import "../../../assets/css/style.css";
import Error500 from "../../pages/Error500";

// Loadable components
const CompanyPerformance = loadable(() =>
  pMinDelay(import("./Elements/CompanyPerformance.jsx"), 500)
);
const CompanyOverView = loadable(() =>
  pMinDelay(import("./Elements/CompanyOverView"), 1000)
);

const tileStyles = {
  container: {
    padding: "20px",
    borderRadius: "10px",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
    cursor: "pointer",
  },
  iconContainer: {
    fontSize: "2.5rem",
    marginBottom: "15px",
    color: "var(--primary)",
  },
  title: {
    fontSize: "16px",
    fontWeight: "500",
    marginBottom: "10px",
  },
  number: {
    fontSize: "24px",
    fontWeight: "600",
  },
};

const DashboardDark = () => {
  const navigate = useNavigate();

  // -------------------------------
  // Enquiries
  // -------------------------------
  const [Enquiries, setEnquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // -------------------------------
  // Trainers (NEW)
  // -------------------------------
  const [trainers, setTrainers] = useState([]); // We'll store the array of trainers here.
  const [hotels, setHotels] = useState([]); // We'll store the array of trainers here.
  const [companies, setCompanies] = useState([]); // We'll store the array of trainers here.
  // Get theme context
  const { changeBackground, background } = useContext(ThemeContext);

  // Card blog data (the tiles at the top)
  const [cardBlog, setCardBlog] = useState([
    {
      title: "Number of Enquires",
      number: "10",
      borderLeft: "4px solid #FFC107",
      textColor: "#000",
    },
    {
      title: "Registered Trainers",
      number: "10",
      borderLeft: "4px solid #E74C3C",
      textColor: "#000",
    },
    {
      title: "Registered Companies",
      number: "5",
      borderLeft: "4px solid #18BC9C",
      textColor: "#000",
    },
    {
      title: "Registered Outbound Hotels",
      number: "10",
      borderLeft: "4px solid #3498DB",
      textColor: "#000",
    },
    {
      title: "Training Completed",
      number: "10",
      borderLeft: "4px solid #3498DB",
      textColor: "#000",
    },
  ]);

  // When theme background changes, update card styles (optional)
  useEffect(() => {
    setCardBlog((prevCards) =>
      prevCards.map((card) => ({
        ...card,
        textColor: background === "dark" ? "#fff" : "#000",
        // Optionally update styles based on theme, e.g. textColor: background === "dark" ? "#fff" : "#000"
      }))
    );
  }, [background]);

  // Update card numbers when Enquiries or trainers change
  useEffect(() => {
    setCardBlog((prevCards) =>
      prevCards.map((card) => {
        if (card.title === "Number of Enquires") {
          return { ...card, number: Enquiries.length.toString() };
        }
        if (card.title === "Registered Trainers") {
          return { ...card, number: trainers.length.toString() };
        }
        if (card.title === "Registered Outbound Hotels") {
          return { ...card, number: hotels.length.toString() };
        }
        if (card.title === "Registered Companies") {
          return { ...card, number: companies.length.toString() };
        }
        return card;
      })
    );
  }, [Enquiries, trainers]);

  // Show More button for Enquiries
  const handleShowMore = () => {
    navigate("/company-enquiries");
  };

  // Show More button for Trainers
  const handleTrainerShowMore = () => {
    navigate("/trainer");
  };

  // On mount, set the background to "light"
  useEffect(() => {
    changeBackground({ value: "light", label: "Light" });
    // We use an empty dependency array so this effect only runs once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // State for datepicker (if needed)
  const [startDate, setStartDate] = useState(null);

  // -------------------------------
  // FETCH ENQUIRIES on mount
  // -------------------------------
  useEffect(() => {
    const fetchRecentEnquiries = async () => {
      try {
        setIsLoading(true);
        const data = await getAllEnquiries();
        setEnquiries(data);
      } catch (error) {
        console.error("Error fetching Enquiries:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecentEnquiries();
  }, []);

  // -------------------------------
  // FETCH TRAINERS on mount (NEW)
  // -------------------------------
  useEffect(() => {
    const fetchRecentTrainers = async () => {
      try {
        // If you want separate loading/error state for trainers, you can manage it here.
        const data = await getAllTrainers();
        setTrainers(data);
      } catch (err) {
        Error500(err);
      }
    };
    fetchRecentTrainers();
  }, []);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        // If you want separate loading/error state for trainers, you can manage it here.
        const data = await getAllCompanies();
        setCompanies(data);
      } catch (err) {
        Error500(err);
      }
    };
    fetchCompanies();
  }, []);

  useEffect(() => {
    const fetchOutboundHotels = async () => {
      try {
        // If you want separate loading/error state for trainers, you can manage it here.
        const hotels = await getAllHotels();
        setHotels(hotels);
      } catch (err) {
        Error500(err);
      }
    };
    fetchOutboundHotels();
  }, []);

  return (
    <>
      <div className="card-body pb-xl-4 pb-sm-3 pb-0">
        <div className="row g-3">
          {cardBlog.map((item, ind) => (
            <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12" key={ind}>
              <div
                style={{
                  ...tileStyles.container,
                  borderLeft: item.borderLeft,
                  width: "100%",
                  height: "100%",
                  minHeight: "120px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <h4 style={{ ...tileStyles.title }}>{item.title}</h4>
                <h2 style={{ ...tileStyles.number }}>{item.number}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RECENT ENQUIRIES */}
      <div className="row">
        <div className="col-xl-6 wow fadeInUp" data-wow-delay="1.5s">
          <div className="card">
            <div className="card-header pb-0 border-0 flex-wrap">
              <div>
                <div className="mb-3">
                  <h2 className="heading mb-0">Recent Enquiries</h2>
                </div>
              </div>
            </div>
            <div className="card-body">
              {/* Display up to 5 Enquiries */}
              <ul className="list-group">
                {Enquiries.slice(0, 5).map((company, index) => (
                  <li key={index} className="list-group-item">
                    {company.companyName} - {company.enquirerName}
                  </li>
                ))}
              </ul>
              <button className="btn btn-primary mt-3" onClick={handleShowMore}>
                Show More
              </button>
            </div>
          </div>
        </div>

        {/* RECENT TRAINERS (NEW) */}
        <div className="col-xl-6 wow fadeInUp" data-wow-delay="1.5s">
          <div className="card">
            <div className="card-header pb-0 border-0 flex-wrap">
              <div>
                <div className="mb-3">
                  <h2 className="heading mb-0">Recently Registered Trainers</h2>
                </div>
              </div>
            </div>
            <div className="card-body">
              {/* Display up to 5 Trainers */}
              <ul className="list-group">
                {trainers.slice(0, 5).map((trainer, index) => (
                  <li key={index} className="list-group-item">
                    {trainer.name} - {trainer.email} - {trainer.phone}
                  </li>
                ))}
              </ul>
              <button
                className="btn btn-primary mt-3"
                onClick={handleTrainerShowMore}
              >
                Show More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* EXAMPLE CALENDAR */}
      <div className="col-xl-12 wow fadeInUp" data-wow-delay="1.5s">
        <div className="card">
          <div className="card-header pb-0 border-0 flex-wrap">
            <div>
              <div className="mb-3">
                <h2 className="heading mb-0">Company Calendar</h2>
              </div>
            </div>
          </div>
          <div className="card-body text-center py-0 px-1">
            <iframe
              src="https://calendar.google.com/calendar/embed?src=YOUR_CALENDAR_ID&ctz=YOUR_TIME_ZONE"
              style={{ border: 0 }}
              width="100%"
              height="600"
              frameBorder="0"
              scrolling="no"
            ></iframe>
          </div>
        </div>
      </div>

      {/* UNPAID COMPANIES */}
      <div className="col-xl-12">
        <div className="card">
          <div className="card-header border-0 p-3">
            <h4 className="heading mb-0">Recent Payments</h4>
          </div>
          <div className="card-body p-0">
            <UnpaidCompanyTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardDark;
