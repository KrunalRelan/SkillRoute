import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Invoice } from "../../models/Invoice";
import { getInvoiceById } from "../../../services/InvoiceService";
import InvoicePrint from './InvoicePrint';
import { Toast, ProgressBar } from "react-bootstrap";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const InvoiceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const printComponentRef = useRef<HTMLDivElement>(null);

  const formatInvoiceDate = (dateString: string | undefined) => {
    if (!dateString) return '-';
    
    // Try parsing with different formats
    const formats = ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss', 'DD-MM-YYYY', 'MM/DD/YYYY'];
    for (const format of formats) {
      const parsed = dayjs(dateString, format);
      if (parsed.isValid()) {
        return parsed.format('DD-MMM-YYYY');
      }
    }
    
    // If none of the specific formats work, try automatic parsing
    const parsed = dayjs(dateString);
    if (parsed.isValid()) {
      return parsed.format('DD-MMM-YYYY');
    }
    
    console.log('Invalid date received:', dateString);
    return dateString; // Return original string if parsing fails
  };

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const data = await getInvoiceById(Number(id));
        setInvoice(data);
      } catch (error) {
        console.error("Error fetching invoice:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoice();
  }, [id]);

  const handlePrint = () => {
    setShowPreview(true);
    
    // Add event listener before showing print dialog
    const onAfterPrint = () => {
      setShowPreview(false);
      window.removeEventListener('afterprint', onAfterPrint);
    };
    window.addEventListener('afterprint', onAfterPrint);

    // Add event listener for when print dialog is closed without printing
    const checkPrintPreview = setInterval(() => {
      if (!document.hasFocus()) {
        clearInterval(checkPrintPreview);
        setShowPreview(false);
      }
    }, 500);

    setTimeout(() => {
      window.print();
      // Clear interval after print dialog is shown
      setTimeout(() => clearInterval(checkPrintPreview), 1000);
    }, 100);
  };

  if (loading) return <div>Loading...</div>;
  if (!invoice) return <div>Invoice not found.</div>;

  return (
    <>
      <div className="container">
        {/* Print Button */}
        <div className="text-end mb-3 no-print">
          <button className="btn btn-primary" onClick={handlePrint}>
            Print Invoice
          </button>
        </div>

        {/* Print Preview - Only shown when showPreview is true */}
        <div style={{ display: showPreview ? "block" : "none" }}>
          <InvoicePrint invoice={invoice} />
        </div>

        {/* Regular Invoice Details View */}
        <div className="card no-print">
          <div className="card-header bg-primary text-white">
            <h4 className="text-center">Invoice Details</h4>
          </div>
          <div className="card-body">
            {/* Invoice Number and Date Row */}
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="form-label">Invoice Number</div>
                <div className="form-control-plaintext">
                  <strong>#{invoice.invoiceNumber || id}</strong>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-label">Invoice Date</div>
                <div className="form-control-plaintext">
                  <strong>{formatInvoiceDate(invoice.invoiceDate)}</strong>
                </div>
              </div>
            </div>

            {/* Billed By Section */}
            <div className="row mb-4">
              <div className="col-md-6">
                <h5 className="text-primary">Billed By</h5>
                <div className="mb-2">
                  <strong>Company Name:</strong>{" "}
                  <span>{invoice.billedBy?.companyName}</span>
                </div>
                <div className="mb-2">
                  <strong>Address:</strong>{" "}
                  <span>{invoice.billedBy?.address}</span>
                </div>
                <div className="mb-2">
                  <strong>GSTIN:</strong> <span>{invoice.billedBy?.gstin}</span>
                </div>
                <div className="mb-2">
                  <strong>PAN:</strong> <span>{invoice.billedBy?.pan}</span>
                </div>
                <div className="mb-2">
                  <strong>Email:</strong> <span>{invoice.billedBy?.email}</span>
                </div>
                <div className="mb-2">
                  <strong>Phone:</strong> <span>{invoice.billedBy?.phone}</span>
                </div>
              </div>

              {/* Billed To Section */}
              <div className="col-md-6">
                <h5 className="text-primary">Billed To</h5>
                <div className="mb-2">
                  <strong>Company Name:</strong>{" "}
                  <span>{invoice.billedTo?.companyName}</span>
                </div>
                <div className="mb-2">
                  <strong>Address:</strong>{" "}
                  <span>{invoice.billedTo?.address}</span>
                </div>
                <div className="mb-2">
                  <strong>GSTIN:</strong>{" "}
                  <span>{invoice.billedTo?.gstn || "-"}</span>
                </div>
                <div className="mb-2">
                  <strong>PAN:</strong>{" "}
                  <span>{invoice.billedTo?.pan || "-"}</span>
                </div>
                <div className="mb-2">
                  <strong>Email:</strong> <span>{invoice.billedTo?.email}</span>
                </div>
                <div className="mb-2">
                  <strong>Phone:</strong>{" "}
                  <span>{invoice.billedTo?.phone || "-"}</span>
                </div>
                <div className="mb-2">
                  <strong>Service:</strong>{" "}
                  <span>{invoice.billedTo?.enquiryName || "-"}</span>
                </div>
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
                  </tr>
                </thead>
                <tbody>
                  {invoice.items?.map((item, idx) => {
                    const quantity = item.quantity ?? 1;
                    const amount = quantity * (item.rate || 0);
                    const taxAmount =
                      (amount * (item.gstPercentage || 0)) / 100;
                    const total = amount + taxAmount;
                    return (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{item.itemDescription || "-"}</td>
                        <td>{item.gstPercentage || 0}%</td>
                        <td>{quantity}</td>
                        <td>{(item.rate || 0).toFixed(2)}</td>
                        <td>{amount.toFixed(2)}</td>
                        <td>{taxAmount.toFixed(2)}</td>
                        <td>{total.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Invoice Summary */}
            <div className="text-end my-3">
              <div className="d-flex justify-content-between">
                <span>Sub Total:</span>
                <span>₹{(invoice.subTotal || 0).toFixed(2)}</span>
              </div>
              {invoice.cgst > 0 || invoice.sgst > 0 ? (
                <>
                  <div className="d-flex justify-content-between">
                    <span>CGST:</span>
                    <span>₹{(invoice.cgst || 0).toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>SGST:</span>
                    <span>₹{(invoice.sgst || 0).toFixed(2)}</span>
                  </div>
                </>
              ) : (
                <div className="d-flex justify-content-between">
                  <span>IGST:</span>
                  <span>₹{(invoice.tax || 0).toFixed(2)}</span>
                </div>
              )}
              <div className="border-top my-2"></div>
              <div className="d-flex justify-content-between fw-bold">
                <span>Total Amount:</span>
                <span>₹{(invoice.totalAmount || 0).toFixed(2)}</span>
              </div>
            </div>

            {/* Bank Details */}
            <div className="mt-4">
              <h5 className="text-primary">Bank Details</h5>
              <p>
                <strong>Account Name:</strong> Confab 360 degree <br />
                <strong>Account Number:</strong> 181805001263 <br />
                <strong>IFSC:</strong> ICIC0001818 <br />
                <strong>Account Type:</strong> Current <br />
                <strong>Bank:</strong> ICICI Bank Ltd
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceDetails;
