import React from 'react';
import { Invoice } from '../../models/Invoice';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import './InvoicePrint.css';

dayjs.extend(customParseFormat);

interface InvoicePrintProps {
  invoice: Invoice | null;
}

const InvoicePrint: React.FC<InvoicePrintProps> = ({ invoice }) => {
  const { id } = useParams<{ id: string }>();
  
  if (!invoice) {
    return null;
  }

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

  // Convert number to words
  const numberToWords = (num: number) => {
    const ones = ['', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE'];
    const tens = ['', '', 'TWENTY', 'THIRTY', 'FORTY', 'FIFTY', 'SIXTY', 'SEVENTY', 'EIGHTY', 'NINETY'];
    const teens = ['TEN', 'ELEVEN', 'TWELVE', 'THIRTEEN', 'FOURTEEN', 'FIFTEEN', 'SIXTEEN', 'SEVENTEEN', 'EIGHTEEN', 'NINETEEN'];
    
    if (num === 0) return 'ZERO';
    
    const convertLessThanThousand = (n: number): string => {
      if (n === 0) return '';
      if (n < 10) return ones[n];
      if (n < 20) return teens[n - 10];
      if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + ones[n % 10] : '');
      return ones[Math.floor(n / 100)] + ' HUNDRED' + (n % 100 !== 0 ? ' ' + convertLessThanThousand(n % 100) : '');
    };
    
    const convertLakh = (n: number): string => {
      if (n < 1000) return convertLessThanThousand(n);
      if (n < 100000) return convertLessThanThousand(Math.floor(n / 1000)) + ' THOUSAND' + (n % 1000 !== 0 ? ' ' + convertLessThanThousand(n % 1000) : '');
      return convertLessThanThousand(Math.floor(n / 100000)) + ' LAKH' + (n % 100000 !== 0 ? ' ' + convertLakh(n % 100000) : '');
    };
    
    return convertLakh(num);
  };

  return (
    <div id="print-area" className="invoice-print">
      <div className="invoice-header">
        <div className="title-section">
          <h1>Invoice</h1>
          <div className="invoice-info">
            <div>Invoice No # <strong>{invoice.invoiceNumber || id}</strong></div>
            <div>Invoice Date: <strong>{formatInvoiceDate(invoice.invoiceDate)}</strong></div>
          </div>
        </div>
        <div className="logo-section">
          <img src="/images/logo.png" alt="CONFAB360 DEGREE" className="company-logo" />
        </div>
      </div>

      <div className="billing-section">
        <div className="billed-by">
          <h3>Billed By</h3>
          <div>
            <strong>{invoice.billedBy?.companyName}</strong><br />
            {invoice.billedBy?.address}<br />
            Delhi, India - 110085<br />
            GSTIN: {invoice.billedBy?.gstin}<br />
            PAN: {invoice.billedBy?.pan}<br />
            Email: {invoice.billedBy?.email}<br />
            Phone: {invoice.billedBy?.phone}
          </div>
        </div>
        <div className="billed-to">
          <h3>Billed To</h3>
          <div>
            <strong>{invoice.billedTo?.companyName}</strong><br />
            {invoice.billedTo?.address}<br />
            {invoice.billedTo?.gstn && <>GSTIN: {invoice.billedTo.gstn}<br /></>}
            {invoice.billedTo?.pan && <>PAN: {invoice.billedTo.pan}<br /></>}
            Email: {invoice.billedTo?.email}<br />
            Phone: {invoice.billedTo?.phone}
          </div>
        </div>
      </div>

      <table className="items-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>GST Rate</th>
            <th>Quantity</th>
            <th>Rate</th>
            <th>Amount</th>
            <th>IGST</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items?.map((item, idx) => {
            const amount = (item.quantity || 0) * (item.rate || 0);
            const igst = amount * (item.gstPercentage || 0) / 100;
            const total = amount + igst;
            return (
              <tr key={idx}>
                <td>{item.itemDescription}</td>
                <td>{item.gstPercentage}%</td>
                <td>{item.quantity}</td>
                <td>₹{(item.rate || 0).toFixed(2)}</td>
                <td>₹{amount.toFixed(2)}</td>
                <td>₹{igst.toFixed(2)}</td>
                <td>₹{total.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="amount-section">
        <div className="amount-words">
          Total (in words): {numberToWords(Math.round(invoice.totalAmount || 0))} RUPEES ONLY
        </div>
        <div className="amount-summary">
          <div className="summary-row">
            <span>Amount:</span>
            <span>₹{(invoice.subTotal || 0).toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>IGST:</span>
            <span>₹{(invoice.tax || 0).toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Round off:</span>
            <span>₹{(Math.round(invoice.totalAmount || 0) - (invoice.totalAmount || 0)).toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total (INR):</span>
            <span>₹{Math.round(invoice.totalAmount || 0).toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="bank-details">
        <h3>Bank Details</h3>
        <div>
          <strong>Account Name:</strong> Confab 360 degree<br />
          <strong>Account Number:</strong> 181805001263<br />
          <strong>IFSC:</strong> ICIC0001818<br />
          <strong>Account Type:</strong> Current<br />
          <strong>Bank:</strong> ICICI Bank Ltd
        </div>
      </div>

      <div className="footer">
        This is an electronically generated invoice, no signature is required.
      </div>
    </div>
  );
};

export default InvoicePrint; 