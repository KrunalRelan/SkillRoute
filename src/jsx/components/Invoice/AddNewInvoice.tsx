import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as ReactDOM from "react-dom";

import {
  createInvoice,
  getAllInvoiceItems,
} from "../../../services/InvoiceService";

import { Invoice } from "../../models/Invoice";
import { InvoiceItem } from "../../models/InvoiceItem";
import { getAllCompanies } from "../../../services/CompanyService";
import { Company } from "../../models/Company";
import { Enquiry } from "../../models/Enquiry"; // Import Enquiry

const AddNewInvoice: React.FC = () => {
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  const [formData, setFormData] = useState<Invoice>({
    invoiceDate: new Date().toISOString().split("T")[0], // Today's date
    billedBy: {
      companyName: "Confab 360 Degree",
      address:
        "Vikas Surya Shopping Complex, 2, 9, VIKAS SURYAPLAZA, POCKET 1, Rohini Sector 24, Delhi, Delhi, India - 110085",
      gstin: "07AUAPM8136F1ZP",
      pan: "AUAPM8136F",
      email: "info@confab360degree.com",
      phone: "+91 99719 07777",
    },
    billedTo: {
      companyId: null,
      companyName: "",
      address: "",
      gstin: "",
      pan: "",
      email: "",
      phone: "",
      // Optionally, you can add a field for enquiry if needed:
      enquiryId: null,
    },
    items: [
      {
        itemId: 0,
        itemDescription: "",
        quantity: 1,
        rate: 0,
        gstPercentage: 0,
      },
    ],
    subTotal: 0,
    tax: 0,
    totalAmount: 0,
    cgst: 0,
    sgst: 0,
    igst: 0,
  });

  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadInvoiceItems = async () => {
      const items = await getAllInvoiceItems();
      setInvoiceItems(items);
    };
    loadInvoiceItems();
  }, []);

  useEffect(() => {
    calculateTotals();
  }, [formData.items, formData.billedTo.address]);

  useEffect(() => {
    const loadCompanies = async () => {
      const data = await getAllCompanies();
      if (data) {
        setCompanies(data);
      }
    };
    loadCompanies();
  }, []);

  // Function was removed to avoid redeclaration with the function defined later in the code
  // useEffect(() => {
  //   const fetchCompaniesAndEnquiries = async () => {
  //     try {
  //       const response = await getAllCompanies();
  //       setCompanies(response.companies || response); // Adjust based on your actual response structure

  //       // Extract enquiries from the response
  //       if (response.enquiries) {
  //         setEnquiries(response.enquiries);
  //       } else if (response[0]?.enquiries) {
  //         // If enquiries are nested inside each company
  //         const allEnquiries: Enquiry[] = response.flatMap(
  //           (company: Company) => company.enquires || []
  //         );
  //         setEnquiries(allEnquiries);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchCompaniesAndEnquiries();
  // }, []);

  useEffect(() => {
    const fetchCompaniesAndEnquiries = async () => {
      try {
        const response = await getAllCompanies();
        console.log("API Response:", response);
        setCompanies(response || []);

        // Extract all enquiries from companies
        let allEnquiries: Enquiry[] = [];

        if (response && Array.isArray(response)) {
          // Loop through each company and collect enquiries
          response.forEach((company: Company) => {
            // Check both possible property names
            const companyEnquiries =
              company.enquiries || company.enquiries || [];
            if (companyEnquiries && companyEnquiries.length > 0) {
              allEnquiries = [...allEnquiries, ...companyEnquiries];
            }
          });
        }

        console.log("Extracted Enquiries:", allEnquiries);
        setEnquiries(allEnquiries);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Load invoice items
    const loadInvoiceItems = async () => {
      const items = await getAllInvoiceItems();
      setInvoiceItems(items);
    };

    fetchCompaniesAndEnquiries();
    loadInvoiceItems();
  }, []);
  const handleBilledInfoChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    section: "billedBy" | "billedTo"
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [name]: value },
    }));
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    setFormData((prev) => {
      const items = [...prev.items];
      items[index] = { ...items[index], [field]: value };
      return { ...prev, items };
    });
  };

  const deleteItem = (index: number) => {
    setFormData((prev) => {
      const items = [...prev.items];
      items.splice(index, 1);
      return { ...prev, items };
    });
  };

  const addItem = () => {
    setFormData((prev) => {
      const items = [
        ...prev.items,
        {
          itemId: 0,
          itemDescription: "",
          quantity: 1,
          rate: 0,
          gstPercentage: 0,
        },
      ];
      return { ...prev, items };
    });
  };

  const calculateTotals = () => {
    let subTotal = 0;

    formData.items.forEach((item) => {
      const amount = item.quantity * item.rate;
      subTotal += amount;
    });

    let cgst = 0,
      sgst = 0,
      igst = 0;
    if (formData.billedTo.address?.toLowerCase().includes("delhi")) {
      cgst = subTotal * 0.09;
      sgst = subTotal * 0.09;
    } else {
      igst = subTotal * 0.18;
    }

    const tax = cgst + sgst + igst;
    const totalAmount = subTotal + tax;

    setFormData((prev) => ({
      ...prev,
      subTotal,
      cgst,
      sgst,
      igst,
      tax,
      totalAmount,
    }));
  };

  const validate = (): boolean => {
    const newErrors: string[] = [];

    if (!formData.invoiceDate) newErrors.push("Invoice Date is required.");
    Object.entries(formData.billedBy).forEach(([key, val]) => {
      if (!val) newErrors.push(`Billed By: ${key} is required.`);
    });
    Object.entries(formData.billedTo).forEach(([key, val]) => {
      if (!val) newErrors.push(`Billed To: ${key} is required.`);
    });

    formData.items.forEach((item, index) => {
      if (!item.itemDescription)
        newErrors.push(`Item ${index + 1}: description is required.`);
      if (item.quantity <= 0)
        newErrors.push(`Item ${index + 1}: quantity must be > 0.`);
      if (item.rate <= 0)
        newErrors.push(`Item ${index + 1}: rate must be > 0.`);
    });

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    await createInvoice(formData);
    navigate("/invoices");
  };

  // Handler for when a company is selected from the dropdown
  const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const companyId = Number(e.target.value);
    const company = companies.find((c) => c.companyId === companyId) || null;
    if (company) {
      setSelectedCompany(company);
      setEnquiries(company.enquiries || []);
      // Update billedTo info from the selected company
      setFormData((prev) => ({
        ...prev,
        billedTo: {
          ...prev.billedTo,
          companyId: company.companyId,
          companyName: company.companyName,
          address: company.addressLine || "",
          email: company.email || "",
          phone: company.phone || "",
          enquiryId: null, // Reset enquiry when company changes
        },
      }));
    } else {
      setSelectedCompany(null);
    }
    // Clear any previously selected enquiry
    setSelectedEnquiry(null);
  };

  // Handler for when an enquiry is selected from the dropdown
  const handleEnquiryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const enquiryId = Number(e.target.value);
    // Find the enquiry in the global enquiries array, not just in selectedCompany
    const enq = enquiries.find((enq: Enquiry) => enq.id === enquiryId) || null;
    setSelectedEnquiry(enq);

    setFormData((prev) => ({
      ...prev,
      billedTo: {
        ...prev.billedTo,
        enquiryId: enq ? enq.id || null : null,
      },
    }));
  };

  return (
    <div className="container">
      {errors.length > 0 && (
        <div className="alert alert-danger">
          <ul>
            {errors.map((err, idx) => (
              <li key={idx}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="card">
        <div className="card-header bg-primary text-white">
          <h4 className="text-center">Add New Invoice</h4>
        </div>
        <div className="card-body">
          {/* Invoice Date */}
          <div className="mb-3">
            <label className="form-label">Invoice Date</label>
            <input
              type="date"
              className="form-control"
              value={formData.invoiceDate}
              onChange={(e) =>
                setFormData({ ...formData, invoiceDate: e.target.value })
              }
            />
          </div>

          {/* Billed By & Billed To */}
          <div className="row mb-4">
            {/* Billed By Section */}
            <div className="col-md-6">
              <h5 className="text-primary">Billed By</h5>
              {Object.keys(formData.billedBy).map((field) => (
                <div className="form-group my-1" key={field}>
                  <input
                    className="form-control"
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={
                      formData.billedBy[field as keyof typeof formData.billedBy]
                    }
                    onChange={(e) => handleBilledInfoChange(e, "billedBy")}
                  />
                </div>
              ))}
            </div>

            {/* Billed To Section with new dropdowns */}
            <div className="col-md-6">
              <h5 className="text-primary">Billed To</h5>
              {/* Company Dropdown */}
              <div className="form-group my-1">
                <label>Select Company</label>
                <select
                  className="form-control"
                  value={
                    formData.billedTo.companyId
                      ? formData.billedTo.companyId.toString()
                      : ""
                  }
                  onChange={handleCompanyChange}
                >
                  <option value="">Select Company</option>
                  {companies.map((company) => (
                    <option
                      key={company.companyId}
                      value={company.companyId ?? 0}
                    >
                      {company.companyName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Enquiry Dropdown */}
              <div className="form-group mb-3">
                <label>Select Enquiry</label>
                <select
                  className="form-control"
                  value={selectedEnquiry?.id || ""}
                  onChange={handleEnquiryChange}
                  disabled={!selectedCompany}
                >
                  <option value="">Select an enquiry</option>
                  {selectedCompany?.enquiries?.map((enq: Enquiry) => (
                    <option key={enq.id} value={enq.id ?? 0}>
                      {enq.areaOfTraining ||
                        enq.enquirerName ||
                        `Enquiry #${enq.id}`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Other Billed To fields (excluding companyId and companyName) */}
              {Object.keys(formData.billedTo)
                .filter(
                  (field) => field !== "companyId" && field !== "companyName"
                )
                .map((field) => (
                  <div className="form-group my-1" key={field}>
                    <input
                      className="form-control"
                      name={field}
                      placeholder={
                        field.charAt(0).toUpperCase() + field.slice(1)
                      }
                      value={
                        formData.billedTo[
                          field as keyof typeof formData.billedTo
                        ] ?? ""
                      }
                      onChange={(e) => handleBilledInfoChange(e, "billedTo")}
                    />
                  </div>
                ))}
            </div>
          </div>

          {/* Items Table */}
          <div className="table-responsive">
            <table className="table table-bordered text-center">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Particulars</th>
                  <th>GST (%)</th>
                  <th>Quantity</th>
                  <th>Rate</th>
                  <th>Amount</th>
                  <th>Tax</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {formData.items.map((item, idx) => {
                  const amount = item.quantity * item.rate;
                  const taxAmount = (amount * item.gstPercentage) / 100;
                  const total = amount + taxAmount;

                  return (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>
                        <select
                          className="form-control"
                          value={item.itemDescription}
                          onChange={(e) => {
                            const selected = invoiceItems.find(
                              (i) => i.itemDescription === e.target.value
                            );
                            handleItemChange(
                              idx,
                              "itemDescription",
                              e.target.value
                            );
                            if (selected) {
                              handleItemChange(idx, "rate", selected.rate);
                              handleItemChange(
                                idx,
                                "gstPercentage",
                                selected.gstPercentage
                              );
                            }
                          }}
                        >
                          <option value="">Select Item</option>
                          {invoiceItems.map((i) => (
                            <option key={i.itemId} value={i.itemDescription}>
                              {i.itemDescription}
                              {/* (₹{i.rate}) */}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>{item.gstPercentage}%</td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          value={item.quantity}
                          onChange={(e) =>
                            handleItemChange(
                              idx,
                              "quantity",
                              Number(e.target.value)
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          value={item.rate}
                          onChange={(e) =>
                            handleItemChange(
                              idx,
                              "rate",
                              Number(e.target.value)
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          value={amount.toFixed(2)}
                          disabled
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          value={taxAmount.toFixed(2)}
                          disabled
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          value={total.toFixed(2)}
                          disabled
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteItem(idx)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="text-end my-3">
            <button className="btn btn-secondary me-2" onClick={addItem}>
              Add Item
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Submit Invoice
            </button>
          </div>

          {/* Totals with box separator - more compact and right-aligned */}
          <div className="row mt-5">
            <div className="col-md-5 col-lg-4 ms-auto">
              {" "}
              {/* Only takes 3-4 columns and pushed to right */}
              <div className="card shadow-sm border">
                <div className="card-body">
                  <h5 className="mb-3">Invoice Summary</h5>
                  <div className="border-top w-100 mb-2"></div>

                  <div className="d-flex justify-content-between w-100">
                    <span>Sub Total:</span>
                    <span>₹{formData.subTotal.toFixed(2)}</span>
                  </div>

                  {formData.cgst > 0 || formData.sgst > 0 ? (
                    <>
                      <div className="d-flex justify-content-between w-100">
                        <span>CGST:</span>
                        <span>₹{formData.cgst.toFixed(2)}</span>
                      </div>
                      <div className="d-flex justify-content-between w-100">
                        <span>SGST:</span>
                        <span>₹{formData.sgst.toFixed(2)}</span>
                      </div>
                    </>
                  ) : (
                    <div className="d-flex justify-content-between w-100">
                      <span>IGST:</span>
                      <span>₹{formData.igst.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="border-top w-100 my-2"></div>
                  <div className="d-flex justify-content-between w-100 fw-bold">
                    <span>Total Amount:</span>
                    <span>₹{formData.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bank Details */}
          <div className="mt-4">
            <h5 className="text-primary">Bank Details</h5>
            <p>
              <strong>Account Name:</strong> Confab 360 degree
              <br />
              <strong>Account Number:</strong> 181805001263
              <br />
              <strong>IFSC:</strong> ICIC0001818
              <br />
              <strong>Account Type:</strong> Current
              <br />
              <strong>Bank:</strong> ICICI Bank Ltd
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewInvoice;
