// HotelsTable.tsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import {
  CircularProgress,
  Alert,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import GenericTable, { TableColumn } from "../../components/GenericTable"; // Import from jsx/components
import { getAllHotels } from "../../../services/HotelService"; // Adjust the path as needed
import { HotelRegistration } from "../../models/HotelRegistrationModel"; // Adjust the path as needed
import { GenericModal } from "../../components/GenericModal"; // Import from jsx/components

const Hotels: React.FC = () => {
  // State declarations
  const [hotels, setHotels] = useState<HotelRegistration[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<HotelRegistration[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("newest");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination states
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Facilities Modal States
  const [facilitiesModalOpen, setFacilitiesModalOpen] = useState(false);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);

  // Ref to prevent multiple API calls on mount
  const didFetchRef = useRef(false);

  // Fetch hotel data on component mount
  useEffect(() => {
    if (didFetchRef.current) return;
    didFetchRef.current = true;

    const fetchHotels = async () => {
      try {
        setIsLoading(true);
        const data: HotelRegistration[] = await getAllHotels();
        setHotels(data);
        setFilteredHotels(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to fetch hotels");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHotels();
  }, []);

  // Search filtering: only filter when searchTerm has at least 3 characters
  useEffect(() => {
    if (searchTerm.length >= 3) {
      const filtered = hotels.filter(
        (hotel) =>
          hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (hotel.city &&
            hotel.city.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredHotels(filtered);
      setCurrentPage(1);
    } else if (searchTerm === "") {
      setFilteredHotels(hotels);
    }
  }, [searchTerm, hotels]);

  // Sorting handler
  const handleSort = (order: string) => {
    setSortOrder(order);
    const sorted = [...filteredHotels];
    switch (order) {
      case "newest":
        sorted.sort((a, b) => {
          if (a.id && b.id) {
            return (b.id as number) - (a.id as number);
          }
          return 0;
        });
        break;
      case "oldest":
        sorted.sort((a, b) => {
          if (a.id && b.id) {
            return (a.id as number) - (b.id as number);
          }
          return 0;
        });
        break;
      case "priceHighToLow":
        sorted.sort((a, b) => {
          const priceA = a.pricePerRoom
            ? parseFloat(String(a.pricePerRoom))
            : 0;
          const priceB = b.pricePerRoom
            ? parseFloat(String(b.pricePerRoom))
            : 0;
          return priceB - priceA;
        });
        break;
      case "priceLowToHigh":
        sorted.sort((a, b) => {
          const priceA = a.pricePerRoom
            ? parseFloat(String(a.pricePerRoom))
            : 0;
          const priceB = b.pricePerRoom
            ? parseFloat(String(b.pricePerRoom))
            : 0;
          return priceA - priceB;
        });
        break;
      default:
        break;
    }
    setFilteredHotels(sorted);
  };

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = Math.ceil(filteredHotels.length / itemsPerPage);

  // Handler to open the facilities modal
  const handleOpenFacilities = (facilities: string[]) => {
    setSelectedFacilities(facilities);
    setFacilitiesModalOpen(true);
  };

  // Handler to close the facilities modal
  const handleCloseFacilities = () => {
    setFacilitiesModalOpen(false);
    setSelectedFacilities([]);
  };

  // Loading state
  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <CircularProgress />
      </div>
    );
  }

  // Error state
  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  // No data found state
  if (!filteredHotels || filteredHotels.length === 0) {
    return <Alert severity="info">No hotels found.</Alert>;
  }

  // Define table columns using the GenericTable column type.
  // Added a new column for "Facilities" which displays the count and opens a fancy popup on click.
  const hotelColumns: TableColumn<HotelRegistration>[] = [
    {
      field: "name",
      headerName: "Hotel Name",
      align: "left",
      render: (value: any, row: HotelRegistration) => (
        <Link to={`/hotel-details/${row.id}`}>{value}</Link>
      ),
    },
    // { field: "city", headerName: "City", align: "left" },
    {
      field: "pricePerRoom",
      headerName: "Price/Room",
      align: "right",
      render: (value: any) => (value ? `$${value}` : "N/A"),
    },
    {
      field: "totalRooms",
      headerName: "Rooms",
      align: "center",
    },
    {
      field: "maxNoOfPax",
      headerName: "Max Pax",
      align: "center",
    },
    {
      field: "facilities",
      headerName: "Facilities",
      align: "center",
      render: (_value: any, row: HotelRegistration) => {
        const facilities = row.facilities || [];
        const count = facilities.length;
        return (
          <Button
            variant="text"
            color="primary"
            onClick={() => handleOpenFacilities(facilities)}
          >
            {count}
          </Button>
        );
      },
    },
    {
      field: "addressLine",
      headerName: "Address",
      align: "left",
      render: (value: any, row: HotelRegistration) =>
        `${value}, ${row.city}, ${row.state}, ${row.pinCode}`,
    },

    {
      field: "actions" as any,
      headerName: "Actions",
      align: "center",
      render: (_: any, row: HotelRegistration) =>
        row.id ? (
          <Link to={`/hotel-details/${row.id}`} className="btn btn-sm btn-secondary">
            View
          </Link>
        ) : null,
    },
  ];

  return (
    <>
      <div className="row">
        <div className="col-xl-12">
          <div className="card h-auto">
            {/* Card Header */}
            <div className="card-header p-3 d-flex justify-content-between align-items-center">
              <Typography variant="h6">Hotel List</Typography>
              <div className="d-flex align-items-center">
                <input
                  type="text"
                  className="form-control me-2"
                  placeholder="Search hotels... (min 3 characters)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Dropdown className="me-2">
                  <Dropdown.Toggle as="div" className="btn btn-secondary">
                    {sortOrder.charAt(0).toUpperCase() + sortOrder.slice(1)}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleSort("newest")}>
                      Newest
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSort("oldest")}>
                      Oldest
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSort("priceHighToLow")}>
                      Price High to Low
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSort("priceLowToHigh")}>
                      Price Low to High
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Link to="/add-hotel" className="btn btn-primary">
                  + New Hotel
                </Link>
              </div>
            </div>

            {/* Card Body with the Generic Table */}
            <div className="card-body p-0">
              <GenericTable<HotelRegistration>
                columns={hotelColumns}
                data={filteredHotels.filter(
                  (
                    hotel
                  ): hotel is HotelRegistration & { id: number | string } =>
                    hotel.id !== null && hotel.id !== undefined
                )}
                title="Hotels"
              />
            </div>

            {/* Card Footer for Pagination */}
            {filteredHotels.length > itemsPerPage && (
              <div className="card-footer d-flex justify-content-between align-items-center">
                <Typography variant="body2">
                  Showing {indexOfFirstItem + 1} to{" "}
                  {Math.min(indexOfLastItem, filteredHotels.length)} of{" "}
                  {filteredHotels.length} entries
                </Typography>
                <nav>
                  <ul className="pagination mb-0">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                    </li>
                    {[...Array(totalPages)].map((_, i) => (
                      <li
                        key={i}
                        className={`page-item ${
                          currentPage === i + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}
                    <li
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fancy Modal for Facilities */}
      <GenericModal
        open={facilitiesModalOpen}
        onClose={handleCloseFacilities}
        title="Facilities"
        content={
          <List>
            {selectedFacilities.map((facility, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <CheckIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary={facility} />
              </ListItem>
            ))}
          </List>
        }
        actions={[
          {
            text: "Close",
            variant: "contained",
            color: "primary",
            onClick: handleCloseFacilities,
          },
        ]}
        maxWidth="sm"
        fullWidth={true}
      />
    </>
  );
};

export default Hotels;
