import React, { useState, useEffect, MouseEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	IconButton,
	Menu,
	MenuItem,
	CircularProgress,
	Alert,
	Divider,
	Typography,
	Box,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
	getAllEnquiries,
	deleteEnquiry,
	updateEnquiry,
} from "../../../services/CompanyService";
import { Enquiry } from "../../models/Enquiry";
import { toast } from "react-toastify";
import { GenericModal } from "../GenericModal";

const CompanyEnquiries: React.FC = () => {
	const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	// For the action menu
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [selectedId, setSelectedId] = useState<number | null>(null);

	// For editing in a modal
	const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
	const [showEditModal, setShowEditModal] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		fetchEnquiries();
	}, []);

	const fetchEnquiries = async () => {
		try {
			setIsLoading(true);
			const data = await getAllEnquiries();
			if (!data || data.length === 0) {
				setError("No enquiries found");
			}
			setEnquiries(data);
		} catch (err: any) {
			setError(err.message || "Failed to fetch enquiries");
		} finally {
			setIsLoading(false);
		}
	};

	const handleClick = (event: MouseEvent<HTMLElement>, id: number) => {
		setAnchorEl(event.currentTarget);
		setSelectedId(id);
	};

	const handleClose = () => {
		setAnchorEl(null);
		setSelectedId(null);
	};

	const handleDelete = async (id: number) => {
		try {
			setIsLoading(true);
			await deleteEnquiry(id);
			await fetchEnquiries();
			toast.success("Enquiry deleted successfully!");
		} catch (err: any) {
			setError(err.message || "Failed to delete enquiry");
			toast.error("Error deleting enquiry!");
		} finally {
			setIsLoading(false);
			handleClose();
		}
	};

	const handleViewDetails = (companyId: number) => {
		navigate(`/company-detail/${companyId}`);
		handleClose();
	};

	// ================================
	//          EDIT HANDLERS
	// ================================
	const handleEditClick = (event: React.MouseEvent, enquiry: Enquiry) => {
		event.preventDefault();
		setSelectedEnquiry(enquiry);
		setShowEditModal(true);
		handleClose(); // close the menu
	};

	const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!selectedEnquiry) return;
		const { name, value } = e.target;
		setSelectedEnquiry((prev) => {
			if (!prev) return null;
			return { ...prev, [name]: value };
		});
	};

	// This will handle form submission
	const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(); // prevent page reload
		if (!selectedEnquiry || !selectedEnquiry.id) return;

		try {
			await updateEnquiry(selectedEnquiry.id, selectedEnquiry);
			toast.success("Enquiry updated successfully!");
			setShowEditModal(false);
			setSelectedEnquiry(null);

			// Refresh the list to see updated data
			await fetchEnquiries();
		} catch (error) {
			toast.error("Error updating enquiry");
		}
	};

	if (isLoading) {
		return <CircularProgress />;
	}

	if (error) {
		return <Alert severity="error">{error}</Alert>;
	}

	return (
		<Paper sx={{ margin: 3 }}>
			<Typography variant="h6" sx={{ margin: 2 }}>
				Training Requirements
			</Typography>

			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="enquiries table">
					<TableHead>
						<TableRow>
							<TableCell>Company Name</TableCell>
							<TableCell>Enquirer Name</TableCell>
							<TableCell>Location</TableCell>
							<TableCell>Email</TableCell>
							<TableCell>Area of Training</TableCell>
							<TableCell>Training Level</TableCell>
							<TableCell align="center">Actions</TableCell>
						</TableRow>
					</TableHead>

					<TableBody sx={{ cursor: "pointer" }}>
						{enquiries.map((enquiry) => (
							<TableRow key={enquiry.id}>
								<TableCell>
									<Link
										to={`/company-detail/${enquiry.companyId}`}
										style={{ textDecoration: "none", color: "#1976d2" }}>
										{enquiry.companyName}
									</Link>
								</TableCell>
								<TableCell>{enquiry.enquirerName}</TableCell>
								<TableCell>
									{enquiry.addressLine} ,{enquiry.city} ,{enquiry.state} -
									{enquiry.postalCode} ,{enquiry.country}{" "}
								</TableCell>
								<TableCell>{enquiry.email}</TableCell>
								<TableCell>{enquiry.areaOfTraining}</TableCell>
								<TableCell>{enquiry.trainingLevel}</TableCell>
								<TableCell align="center">
									<IconButton onClick={(e) => handleClick(e, enquiry.id ?? 0)}>
										<MoreVertIcon />
									</IconButton>
									<Menu
										anchorEl={anchorEl}
										open={Boolean(anchorEl) && selectedId === enquiry.id}
										onClose={handleClose}
										transformOrigin={{ horizontal: "right", vertical: "top" }}
										anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
										{/* View Details */}
										<MenuItem
											onClick={() => handleViewDetails(enquiry.companyId ?? 0)}>
											<VisibilityIcon fontSize="small" sx={{ mr: 1 }} />
											View Details
										</MenuItem>

										<Divider />

										{/* Edit => open modal */}
										<MenuItem
											onClick={(event) => handleEditClick(event, enquiry)}>
											<EditIcon fontSize="small" sx={{ mr: 1 }} />
											Edit
										</MenuItem>

										<Divider />

										{/* Delete */}
										<MenuItem
											onClick={() => handleDelete(enquiry.id ?? 0)}
											sx={{ color: "error.main" }}>
											<DeleteIcon fontSize="small" sx={{ mr: 1 }} />
											Delete
										</MenuItem>
									</Menu>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			{/* EDIT ENQUIRY MODAL */}
			<GenericModal
				title="Edit Enquiry"
				open={showEditModal}
				onClose={() => setShowEditModal(false)}
				// We pass an EMPTY array to avoid having a second "Save" button from 'actions'
				actions={
					[
						{
							text: "Save",
							variant: "contained",
							color: "primary",
							onClick: () => handleEditSubmit,
							isLoading: false,
						},
						{
							text: "Cancel",
							variant: "text",
							color: "secondary",
							onClick: () => setShowEditModal(false),
						},
					] // Empty array
				}
				content={
					<form onSubmit={handleEditSubmit}>
						<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
							<div>
								<label>Company Name</label>
								<input
									type="text"
									name="companyName"
									value={selectedEnquiry?.companyName || ""}
									onChange={handleEditChange}
									style={{ width: "100%", padding: "8px", marginTop: "4px" }}
								/>
							</div>
							<div>
								<label>Enquirer Name</label>
								<input
									type="text"
									name="enquirerName"
									value={selectedEnquiry?.enquirerName || ""}
									onChange={handleEditChange}
									style={{ width: "100%", padding: "8px", marginTop: "4px" }}
								/>
							</div>
							<div>
								<label>Location</label>
								<input
									type="text"
									name="AddressLine"
									value={selectedEnquiry?.addressLine || ""}
									onChange={handleEditChange}
									style={{ width: "100%", padding: "8px", marginTop: "4px" }}
								/>
							</div>
							<div>
								<label>Email</label>
								<input
									type="email"
									name="email"
									value={selectedEnquiry?.email || ""}
									onChange={handleEditChange}
									style={{ width: "100%", padding: "8px", marginTop: "4px" }}
								/>
							</div>
							<div>
								<label>Area of Training</label>
								<input
									type="text"
									name="areaOfTraining"
									value={selectedEnquiry?.areaOfTraining || ""}
									onChange={handleEditChange}
									style={{ width: "100%", padding: "8px", marginTop: "4px" }}
								/>
							</div>
							<div>
								<label>Training Level</label>
								<input
									type="text"
									name="trainingLevel"
									value={selectedEnquiry?.trainingLevel || ""}
									onChange={handleEditChange}
									style={{ width: "100%", padding: "8px", marginTop: "4px" }}
								/>
							</div>
						</Box>
					</form>
				}
			/>
		</Paper>
	);
};

export default CompanyEnquiries;
