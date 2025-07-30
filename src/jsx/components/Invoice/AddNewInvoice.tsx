import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import {
  createInvoice,
  getAllInvoiceItems,
} from "../../../services/InvoiceService";

import { Invoice } from "../../models/Invoice";
import { InvoiceItem } from "../../models/InvoiceItem";
import { getAllCompanies } from "../../../services/CompanyService";
import { Company } from "../../models/Company";
import { Enquiry } from "../../models/Enquiry"; // Import Enquiry
import { Toast, ProgressBar } from "react-bootstrap";
import InvoicePrint from './InvoicePrint';

const AddNewInvoice: React.FC = () => {
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // Errors stored as an object where key is the field and value is the error message.
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const printComponentRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<Invoice>({
    invoiceDate: new Date().toISOString().split("T")[0], // Today's date
    billedBy: {
      companyName: "Confab 360 Degree",
      address: "Delhi, Delhi, India - 110085",
      gstin: "07AUAPM8136F1ZP",
    
      email: "info@confab360degree.com",
      phone: "+91 99719 07777",
    },
    billedTo: {
      companyId: null,
      companyName: "",
      address: "",
      gstn: "",
      pan: "",
      email: "",
      phone: "",
      enquiryId: null,
      enquiryName: null,
    },
    items: [
      {
        itemId: 0,
        itemDescription: "",
        quantity: 1,
        rate: 0,
        gstPercentage: 0,
        amount: 0,
      },
    ],
    subTotal: 0,
    tax: 0,
    totalAmount: 0,
    cgst: 0,
    sgst: 0,
    igst: 0,
  });
  const navigate = useNavigate();

  // Progress bar animation effect
  useEffect(() => {
    let progressInterval: NodeJS.Timeout;

    if (isLoading) {
      progressInterval = setInterval(() => {
        setProgress((oldProgress) => {
          // Only go to ~90% automatically, the last 10% will happen when API call completes
          if (oldProgress >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return oldProgress + 5;
        });
      }, 200);
    }

    return () => {
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [isLoading]);

  // Load invoice items
  useEffect(() => {
    const loadInvoiceItems = async () => {
      const items = await getAllInvoiceItems();
      setInvoiceItems(items);
    };
    loadInvoiceItems();
  }, []);

  // Recalculate totals when items or billedTo.address change
  useEffect(() => {
    calculateTotals();
  }, [formData.items, formData.billedTo.address]);

  // Fetch companies and extract enquiries
  useEffect(() => {
    const fetchCompaniesAndEnquiries = async () => {
      try {
        const response = await getAllCompanies();
        console.log("API Response:", response);
        setCompanies(response || []);

        // Loop through each company and collect enquiries
        let allEnquiries: Enquiry[] = [];
        if (response && Array.isArray(response)) {
          response.forEach((company: Company) => {
            const companyEnquiries = company.enquiries || [];
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

    fetchCompaniesAndEnquiries();
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
      
      // Calculate amount whenever quantity or rate changes
      if (field === 'quantity' || field === 'rate') {
        const quantity = field === 'quantity' ? value : items[index].quantity;
        const rate = field === 'rate' ? value : items[index].rate;
        items[index].amount = quantity * rate;
      }
      
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
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          itemId: 0,
          itemDescription: "",
          quantity: 1,
          rate: 0,
          gstPercentage: 0,
          amount: 0,
        },
      ],
    }));
  };

  const calculateTotals = () => {
    let subTotal = 0;
    formData.items.forEach((item) => {
      subTotal += item.quantity * item.rate;
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
  // Validate the form and return an object of errors
  const validateForm = (): { [key: string]: string } => {
    const newErrors: { [key: string]: string } = {};

    // Validate invoice date
    if (!formData.invoiceDate || formData.invoiceDate.trim() === "") {
      newErrors.invoiceDate = "Invoice Date is required.";
    }

    // Skip validation for Billed By fields since they're disabled
    // We assume these fields come pre-filled and don't need validation

    // Validate company selection in billedTo
    if (!formData.billedTo.companyId) {
      newErrors["billedTo.companyId"] = "Selecting a company is required.";
    }

    // Validate company name separately
    if (
      !formData.billedTo.companyName ||
      formData.billedTo.companyName.trim() === ""
    ) {
      newErrors["billedTo.companyName"] = "Company Name is required.";
    }

    // Validate required fields in billedTo
    const requiredBilledToFields = ["address", "email", "phone"];
    requiredBilledToFields.forEach((field) => {
      const value = formData.billedTo[field as keyof typeof formData.billedTo];
      if (!value || value.toString().trim() === "") {
        newErrors[`billedTo.${field}`] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required.`;
      }
    });

    // Special validation for email format
    if (
      formData.billedTo.email &&
      !/\S+@\S+\.\S+/.test(formData.billedTo.email)
    ) {
      newErrors["billedTo.email"] = "Enter a valid email address.";
    }

    // Special validation for phone format (optional)
    if (
      formData.billedTo.phone &&
      !/^[0-9+\-\s()]{10,15}$/.test(formData.billedTo.phone)
    ) {
      newErrors["billedTo.phone"] = "Enter a valid phone number.";
    }

    // GSTIN validation (if needed for India)
    if (
      formData.billedTo.gstn &&
      !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(
        formData.billedTo.gstn
      )
    ) {
      newErrors["billedTo.gstin"] = "Enter a valid GSTIN.";
    }

    // Validate each invoice item
    formData.items.forEach((item, index) => {
      // Check for item description
      if (!item.itemDescription) {
        newErrors[`items[${index}].itemDescription`] =
          "Item description is required";
      }

      // Check for valid quantity
      if (item.quantity <= 0) {
        newErrors[`items[${index}].quantity`] =
          "Quantity must be greater than 0";
      }

      // Check for valid rate
      if (item.rate <= 0) {
        newErrors[`items[${index}].rate`] = "Rate must be greater than 0";
      }

      // Optional: Check for valid GST percentage (should be between 0-100)
      if (item.gstPercentage < 0 || item.gstPercentage > 100) {
        newErrors[`items[${index}].gstPercentage`] =
          "GST percentage must be between 0 and 100";
      }
    });

    // Check if at least one item exists
    if (formData.items.length === 0) {
      newErrors["items"] = "At least one item is required";
    }

    return newErrors;
  };

  const handleSubmit = async () => {
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      setErrorMessage("Please fix the errors in the form");
      setShowToast(true);
      return;
    }

    try {
      setIsLoading(true);
      setProgress(0);
      setShowToast(true);
      setErrorMessage(null);

      await createInvoice(formData);

      // Successfully created
      setProgress(100);
      setTimeout(() => {
        navigate("/invoice");
      }, 500);
    } catch (error) {
      setErrorMessage(
        `Failed to create invoice: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
      setProgress(0);
    } finally {
      setIsLoading(false);
      // Keep the toast visible for errors, but hide it on success as we navigate away
    }
  };

  // When a company is selected, update formData and load its enquiries
  const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const companyId = Number(e.target.value);
    const company = companies.find((c) => c.companyId === companyId) || null;
    if (company) {
      setSelectedCompany(company);
      // Update the enquiries with the selected company's enquiries (if any)
      setEnquiries(company.enquiries || []);
      setFormData((prev) => ({
        ...prev,
        billedTo: {
          ...prev.billedTo,
          companyId: company.companyId || null,
          companyName: company.companyName || "",
          address: company.addressLine || "",
          email: company.email || "",
          phone: company.phone || "",
          gstn: prev.billedTo.gstn,
          pan: prev.billedTo.pan,
          enquiryId: prev.billedTo.enquiryId,
          enquiryName: prev.billedTo.enquiryName
        },
      }));
    } else {
      setSelectedCompany(null);
      setEnquiries([]);
    }
    setSelectedEnquiry(null);
  };

  // When an enquiry is selected, update formData
  const handleEnquiryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const enquiryId = Number(e.target.value);
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

  // Add print function
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="container">
        {/* Hidden print component */}
        <div style={{ display: 'none' }}>
          <div ref={printComponentRef}>
            <InvoicePrint invoice={formData} />
          </div>
        </div>

        {/* Toast notification */}
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            minWidth: "250px",
            zIndex: 9999,
          }}
          delay={5000}
          autohide={!errorMessage} // Only auto-hide for success
        >
          <Toast.Header closeButton={true}>
            <strong className="me-auto">
              {errorMessage ? "Error" : "Success"}
            </strong>
          </Toast.Header>
          <Toast.Body>
            {errorMessage || "Invoice created successfully!"}
            {isLoading && <ProgressBar animated now={progress} />}
          </Toast.Body>
        </Toast>

        {/* Centered loader */}
        {isLoading && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(255,255,255,0.7)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1050,
            }}
          >
            <div
              className="text-center p-4 bg-white rounded shadow"
              style={{ width: "300px" }}
            >
              <h5 className="mb-3">Saving Invoice...</h5>
              <ProgressBar animated now={progress} className="mb-3" />
              <p className="text-muted small">Please wait</p>
            </div>
          </div>
        )}

        {/* Display all error messages as a summary */}
        {Object.keys(errors).length > 0 && (
          <div className="alert alert-danger">
            <ul>
              {Object.entries(errors).map(([key, errorMsg]) => (
                <li key={key}>{errorMsg}</li>
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
              {errors.invoiceDate && (
                <small className="text-danger">{errors.invoiceDate}</small>
              )}
            </div>

            {/* Billed By & Billed To */}
            <div className="row mb-4">
              {/* Billed By Section - Non-editable */}
              <div className="col-md-6">
                <h5 className="text-primary">Billed By</h5>
                {Object.keys(formData.billedBy).map((field) => (
                  <div className="form-group my-1" key={field}>
                    <label className="small text-muted">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      className="form-control"
                      name={field}
                      placeholder={
                        field.charAt(0).toUpperCase() + field.slice(1)
                      }
                      value={
                        formData.billedBy[
                          field as keyof typeof formData.billedBy
                        ]
                      }
                      onChange={(e) => handleBilledInfoChange(e, "billedBy")}
                      disabled={true} // Fields remain non-editable
                    />
                    {errors[`billedBy.${field}`] && (
                      <small className="text-danger">
                        {errors[`billedBy.${field}`]}
                      </small>
                    )}
                  </div>
                ))}
              </div>

              {/* Billed To Section - Fully Editable */}
              <div className="col-md-6">
                <h5 className="text-primary">Billed To</h5>
                {/* Company Dropdown */}
                <div className="form-group my-1">
                  <label className="small text-muted">
                    Select Company <span className="text-danger">*</span>
                  </label>
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
                  {errors["billedTo.companyId"] && (
                    <small className="text-danger">
                      {errors["billedTo.companyId"]}
                    </small>
                  )}
                </div>

                {/* Enquiry Dropdown */}
                <div className="form-group mb-3">
                  <label className="small text-muted">Select Services</label>
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

                {/* Other Billed To fields - Editable */}
                {Object.keys(formData.billedTo)
                  .filter(
                    (field) =>
                      field !== "companyId" &&
                      field !== "companyName" &&
                      field !== "enquiryId" &&
                      field !== "enquiryName"
                  )
                  .map((field) => (
                    <div className="form-group my-1" key={field}>
                      <label className="small text-muted">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
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
                      {errors[`billedTo.${field}`] && (
                        <small className="text-danger">
                          {errors[`billedTo.${field}`]}
                        </small>
                      )}
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
                              if (selected) {
                                handleItemChange(idx, "itemId", selected.itemId);
                                handleItemChange(idx, "itemDescription", selected.itemDescription);
                                handleItemChange(idx, "rate", selected.rate);
                                handleItemChange(idx, "gstPercentage", selected.gstPercentage);
                                // Calculate amount after setting rate
                                handleItemChange(idx, "amount", selected.rate * item.quantity);
                              }
                            }}
                          >
                            <option value="">Select Item</option>
                            {invoiceItems.map((i) => (
                              <option key={i.itemId} value={i.itemDescription}>
                                {i.itemDescription}
                              </option>
                            ))}
                          </select>
                          {errors[`item.${idx}.itemDescription`] && (
                            <small className="text-danger">
                              {errors[`item.${idx}.itemDescription`]}
                            </small>
                          )}
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
                          {errors[`item.${idx}.quantity`] && (
                            <small className="text-danger">
                              {errors[`item.${idx}.quantity`]}
                            </small>
                          )}
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
                          {errors[`item.${idx}.rate`] && (
                            <small className="text-danger">
                              {errors[`item.${idx}.rate`]}
                            </small>
                          )}
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
              <button className="btn btn-info me-2" onClick={handlePrint}>
                Print Invoice
              </button>
              <button className="btn btn-primary" onClick={handleSubmit}>
                Submit Invoice
              </button>
            </div>

            {/* Invoice Summary */}
            <div className="row mt-5">
              <div className="col-md-5 col-lg-4 ms-auto">
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
    </>
  );
};

export default AddNewInvoice;
