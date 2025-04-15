import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Invoice } from "../../models/Invoice";
import { getInvoiceById } from "../../../services/InvoiceService";

const InvoiceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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

  if (loading) return <div>Loading...</div>;
  if (!invoice) return <div>Invoice not found.</div>;

  return (
    <div className="container" id="invoiceDetails">
      {/* Print Button */}
      <div className="text-end mb-3">
        <button className="btn btn-primary" onClick={() => window.print()}>
          Print Invoice
        </button>
      </div>

      <div className="card">
        <div className="card-header bg-primary text-white">
          <h4 className="text-center">Invoice Details</h4>
        </div>
        <div className="card-body">
          {/* Invoice Date */}
          <div className="mb-3">
            <label className="form-label">Invoice Date</label>
            <div className="form-control-plaintext">{invoice.invoiceDate}</div>
          </div>

          <div className="row mb-4">
            {/* Billed By Section (Hardcoded) */}
            <div className="col-md-6">
              <h5 className="text-primary">Billed By</h5>
              <div className="mb-2">
                <strong>Company Name:</strong> <span>Confab 360 Degree</span>
              </div>
              <div className="mb-2">
                <strong>Address:</strong>{" "}
                <span>Delhi, Delhi, India - 110085</span>
              </div>
              <div className="mb-2">
                <strong>GSTIN:</strong> <span>07AUAPM8136F1ZP</span>
              </div>
              <div className="mb-2">
                <strong>Email:</strong> <span>info@confab360degree.com</span>
              </div>
              <div className="mb-2">
                <strong>Phone:</strong> <span>+91 99719 07777</span>
              </div>
            </div>

            {/* Billed To Section */}
            <div className="col-md-6">
              <h5 className="text-primary">Billed To</h5>
              <div className="mb-2">
                <strong>Company Name:</strong>{" "}
                <span>{invoice.billedTo.companyName}</span>
              </div>
              <div className="mb-2">
                <strong>Address:</strong>{" "}
                <span>{invoice.billedTo.address}</span>
              </div>
              <div className="mb-2">
                <strong>GSTIN:</strong>{" "}
                <span>
                  {invoice.billedTo.gstn || invoice.billedTo.gstn || "-"}
                </span>
              </div>
              <div className="mb-2">
                <strong>PAN:</strong> <span>{invoice.billedTo.pan || "-"}</span>
              </div>
              <div className="mb-2">
                <strong>Email:</strong> <span>{invoice.billedTo.email}</span>
              </div>
              <div className="mb-2">
                <strong>Phone:</strong>{" "}
                <span>{invoice.billedTo.phone || "-"}</span>
              </div>
			  <div className="mb-2">
				<strong>Service:</strong>{" "}
				<span>
				  {invoice.billedTo.enquiryName
					? invoice.billedTo.enquiryName
					: "-"}
				</span>			  
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
                {invoice.items.map((item, idx) => {
                  // If quantity is missing, default to 1.
                  const quantity = item.quantity ?? 1;
                  const amount = quantity * item.rate;
                  const taxAmount = (amount * item.gstPercentage) / 100;
                  const total = amount + taxAmount;
                  return (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{item.itemDescription || "-"}</td>
                      <td>{item.gstPercentage}%</td>
                      <td>{quantity}</td>
                      <td>{item.rate.toFixed(2)}</td>
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
              <span>₹{invoice.subTotal.toFixed(2)}</span>
            </div>
            {invoice.cgst > 0 || invoice.sgst > 0 ? (
              <>
                <div className="d-flex justify-content-between">
                  <span>CGST:</span>
                  <span>₹{invoice.cgst.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>SGST:</span>
                  <span>₹{invoice.sgst.toFixed(2)}</span>
                </div>
              </>
            ) : (
              <div className="d-flex justify-content-between">
                <span>IGST:</span>
                <span>₹{invoice.tax.toFixed(2)}</span>
              </div>
            )}
            <div className="border-top my-2"></div>
            <div className="d-flex justify-content-between fw-bold">
              <span>Total Amount:</span>
              <span>₹{invoice.totalAmount.toFixed(2)}</span>
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
  );
};

export default InvoiceDetails;
