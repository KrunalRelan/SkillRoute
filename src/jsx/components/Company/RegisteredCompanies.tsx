// RegisteredCompanies.tsx

import React, { useEffect, useState } from "react";
import GenericTable from "../GenericTable";
import { Company } from "../../models/Company";
import { getAllCompanies } from "../../../services/CompanyService";
import { TableColumn } from "../GenericTable";

const companyColumns: TableColumn<Company>[] = [
	{
		field: "companyName",
		headerName: "Company Name",
		align: "left",
		render: (value: any) => value || "-",
	},
	{
		field: "addressLine",
		headerName: "Address",
		align: "left",
		render: (value: any, row: Company) => {
			const address = [value, row.city, row.state, row.postalCode, row.country]
				.filter(Boolean)
				.join(", ");

			return address || "-";
		},
	},
	{
		field: "email",
		headerName: "Email",
		align: "left",
		render: (value: any) => value || "-",
	},
	{
		field: "phone",
		headerName: "Phone",
		align: "left",
		render: (value: any) => value || "-",
	},
	{
		field: "enquirerName",
		headerName: "Enquirer Name",
		align: "left",
		render: (value: any) => value || "-",
	},
];

const RegisteredCompanies: React.FC = () => {
	const [companies, setCompanies] = useState<
		Array<Company & { id: string | number }>
	>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetchCompanies();
	}, []);

	const fetchCompanies = async () => {
		try {
			setLoading(true);
			const data = await getAllCompanies(); // returns Company[]
			// Map each to add an `id` property
			const companiesWithId = data.map(
				(company: { companyId: any }, index: any) => ({
					...company,
					id: company.companyId ?? index,
				})
			);
			setCompanies(companiesWithId);
		} catch (err: any) {
			setError(err.message || "Failed to fetch companies");
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return <div style={{ padding: "1rem" }}>Loading...</div>;
	}

	if (error) {
		return (
			<div style={{ color: "red", padding: "1rem" }}>
				Failed to load data: {error}
			</div>
		);
	}

	if (companies.length === 0) {
		return <div style={{ padding: "1rem" }}>No companies found.</div>;
	}

	return (
		<div className="card h-auto">
			<div className="card-header border-0 p-3">
				<h4 className="heading mb-0">Registered Companies</h4>
			</div>
			<div className="card-body p-0">
				<GenericTable columns={companyColumns} data={companies} title="" />
			</div>
		</div>
	);
};

export default RegisteredCompanies;
