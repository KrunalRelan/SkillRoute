// src/components/invoice/AddNewInvoice.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { createInvoice } from "../../../services/InvoiceService";
import { getAllInvoiceItems } from "../../../services/InvoiceItemService";
import { Invoice } from "../../models/Invoice";
import { InvoiceItem } from "../../models/InvoiceItem";

const AddNewInvoice: React.FC = () => {
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);
  const [formData, setFormData] = useState<Invoice>({
    // This value can be ignored on creation; server will generate it.
    invoiceDate: "",
    billedBy: {
      companyName: "",
      address: "",
      gstin: "",
      pan: "",
      email: "",
      phone: "",
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
        itemId: "",
        description: "",
        quantity: 1,
        rate: 0,
        amount: 0,
        gstPercentage: 0,
        taxAmount: 0,
        total: 0,
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

  useEffect(() => {
    const loadInvoiceItems = async () => {
      const items = await getAllInvoiceItems();
      setInvoiceItems(items);
    };
    loadInvoiceItems();
  }, []);

  // Handle changes for Billed By / Billed To fields
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

  // Handle changes for invoice item fields and recalc line totals
  const handleItemChange = (index: number, field: string, value: any) => {
    setFormData((prev) => {
      const items = [...prev.items];
      let item = { ...items[index], [field]: value };

      // Recalculate amount when quantity or rate changes
      item.amount = item.quantity * item.rate;
      // If gstPercentage is available, calculate tax amount and line total
      if (item.gstPercentage) {
        item.taxAmount = parseFloat(
          ((item.amount * item.gstPercentage) / 100).toFixed(2)
        );
        item.total = parseFloat((item.amount + item.taxAmount).toFixed(2));
      } else {
        item.taxAmount = 0;
        item.total = item.amount;
      }
      items[index] = item;
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
          itemId: "",
          description: "",
          quantity: 1,
          rate: 0,
          amount: 0,
          gstPercentage: 0,
          taxAmount: 0,
          total: 0,
        },
      ],
    }));
  };

  // Calculate invoice-level totals and apply GST rules
  const calculateTotals = () => {
    const subTotal = formData.items.reduce((acc, item) => acc + item.amount, 0);
    let invoiceTax = 0;
    let cgst = 0,
      sgst = 0,
      igst = 0;

    // Determine GST rule based on billedTo address (if it includes "delhi" then intra‑state)
    if (
      formData.billedTo.address &&
      formData.billedTo.address.toLowerCase().includes("delhi")
    ) {
      cgst = subTotal * 0.09;
      sgst = subTotal * 0.09;
      invoiceTax = cgst + sgst;
    } else {
      igst = subTotal * 0.18;
      invoiceTax = igst;
    }
    const totalAmount = subTotal + invoiceTax;
    setFormData((prev) => ({
      ...prev,
      subTotal,
      cgst,
      sgst,
      igst,
      tax: invoiceTax,
      totalAmount,
    }));
  };

  const handleSubmit = async () => {
    calculateTotals();
    // The createInvoice method should generate the invoice number on the server.
    await createInvoice(formData);
    navigate("/invoices");
  };

  return (
    <div className="container">
      <h3 className="mt-4 mb-3 text-center">Invoice</h3>
      {/* Invoice Header */}
      <div className="row mb-4">
        {/* Removed invoice number input - it will be generated on the server */}
        <div className="col-md-6">
          <div className="form-group">
            <label>Invoice Date</label>
            <input
              type="date"
              className="form-control"
              placeholder="Invoice Date"
              value={formData.invoiceDate}
              onChange={(e) =>
                setFormData({ ...formData, invoiceDate: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      {/* Billed By / Billed To Sections */}
      <div className="row mb-4">
        <div className="col-md-6">
          <h5>Billed By</h5>
          {Object.keys(formData.billedBy).map((field) => (
            <div className="form-group" key={field}>
              <input
                className="form-control my-1"
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={(formData.billedBy as any)[field]}
                onChange={(e) => handleBilledInfoChange(e, "billedBy")}
              />
            </div>
          ))}
        </div>
        <div className="col-md-6">
          <h5>Billed To</h5>
          {Object.keys(formData.billedTo).map((field) => (
            <div className="form-group" key={field}>
              <input
                className="form-control my-1"
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={(formData.billedTo as any)[field]}
                onChange={(e) => handleBilledInfoChange(e, "billedTo")}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Invoice Items Table */}
      <h5 className="mt-4">Invoice Items</h5>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr className="text-center">
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
            {formData.items.map((item, idx) => (
              <tr key={idx} className="text-center">
                <td>{idx + 1}</td>
                <td>
                  <select
                    className="form-control"
                    value={item.description}
                    onChange={(e) => {
                      const selectedItem = invoiceItems.find(
                        (i) => i?.description === e.target.value
                      );
                      handleItemChange(idx, "description", e.target.value);
                      if (selectedItem) {
                        handleItemChange(idx, "rate", selectedItem.rate);
                        handleItemChange(
                          idx,
                          "gstPercentage",
                          selectedItem.gstPercentage
                        );
                      } else {
                        handleItemChange(idx, "rate", 0);
                        handleItemChange(idx, "gstPercentage", 0);
                      }
                    }}
                  >
                    <option value="">Select Item</option>
                    {invoiceItems.map((i) => (
                      <option key={i.itemId} value={i.description ?? ""}>
                        {i.description} (₹{i.rate})
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
                      handleItemChange(idx, "quantity", Number(e.target.value))
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
                    value={item.amount.toFixed(2)}
                    disabled
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={item.taxAmount?.toFixed(2) || "0.00"}
                    disabled
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={item.total?.toFixed(2) || "0.00"}
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
            ))}
          </tbody>
        </table>
      </div>

      {/* Invoice Summary */}
      <div className="row mt-4">
        <div className="col-md-4">
          <h5>Sub Total: ₹{formData.subTotal.toFixed(2)}</h5>
        </div>
        {formData.cgst > 0 || formData.sgst > 0 ? (
          <>
            <div className="col-md-4">
              <h5>CGST (9%): ₹{formData.cgst.toFixed(2)}</h5>
            </div>
            <div className="col-md-4">
              <h5>SGST (9%): ₹{formData.sgst.toFixed(2)}</h5>
            </div>
          </>
        ) : (
          <div className="col-md-4">
            <h5>IGST (18%): ₹{formData.igst.toFixed(2)}</h5>
          </div>
        )}
      </div>
      <div className="row mb-4">
        <div className="col-md-12 text-end">
          <h5>Total Amount: ₹{formData.totalAmount.toFixed(2)}</h5>
        </div>
      </div>

      {/* Bank Details */}
      <div className="row mb-4">
        <div className="col-md-12">
          <h5>Bank Details</h5>
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

      {/* Action Buttons */}
      <div className="d-flex justify-content-between">
        <button className="btn btn-secondary" onClick={addItem}>
          Add Item
        </button>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit Invoice
        </button>
      </div>
    </div>
  );
};

export default AddNewInvoice;
