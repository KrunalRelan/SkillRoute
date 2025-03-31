import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  createInvoice,
  getAllInvoiceItems,
} from "../../../services/InvoiceService";

import { Invoice } from "../../models/Invoice";
import { InvoiceItem } from "../../models/InvoiceItem";

const AddNewInvoice: React.FC = () => {
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);
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
      companyName: "",
      address: "",
      gstin: "",
      pan: "",
      email: "",
      phone: "",
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
            {["billedBy", "billedTo"].map((section) => (
              <div className="col-md-6" key={section}>
                <h5 className="text-primary">
                  {section === "billedBy" ? "Billed By" : "Billed To"}
                </h5>
                {Object.keys(formData[section as "billedBy" | "billedTo"]).map((field) => (
                  <div className="form-group my-1" key={field}>
                    <input
                      className="form-control"
                      name={field}
                      placeholder={
                        field.charAt(0).toUpperCase() + field.slice(1)
                      }
                      value={(formData[section as "billedBy" | "billedTo"])[field as keyof typeof formData.billedBy]}
                      onChange={(e) =>
                        handleBilledInfoChange(
                          e,
                          section as "billedBy" | "billedTo"
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            ))}
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
                              {i.itemDescription} (₹{i.rate})
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
                          disabled
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

          <div className="text-end my-3">
            <button className="btn btn-secondary me-2" onClick={addItem}>
              Add Item
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Submit Invoice
            </button>
          </div>

          {/* Totals */}
          <div className="mt-4">
            <h5>Sub Total: ₹{formData.subTotal.toFixed(2)}</h5>
            {formData.cgst > 0 || formData.sgst > 0 ? (
              <>
                <h6>CGST: ₹{formData.cgst.toFixed(2)}</h6>
                <h6>SGST: ₹{formData.sgst.toFixed(2)}</h6>
              </>
            ) : (
              <h6>IGST: ₹{formData.igst.toFixed(2)}</h6>
            )}
            <h4>Total Amount: ₹{formData.totalAmount.toFixed(2)}</h4>
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
