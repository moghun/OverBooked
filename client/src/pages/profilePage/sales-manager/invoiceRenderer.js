// services/reportGenerator.js

import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
import { format } from "date-fns";

// define a generatePDF function that accepts a tickets argument
const savePDF = (invoice) => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ["Amount", "Product Name", "Cost"];
  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
  for (let i = 0; i < invoice.products[0].length; i++) {
    {
      const invoiceData = [
        invoice.products[2][i],
        invoice.products[1][i],
        invoice.products[0][i],
      ];
      tableRows.push(invoiceData);
    }
  }
  doc.autoTable(tableColumn, tableRows, { startY: 55 });

  // startY is basically margin-top
  // we use a date string to generate our filename.
  // ticket title. and margin-top + margin-left

  const userColumn = ["E-Mail", "Tax ID", "Card No", "Total Cost", "Date"];
  const userRows = [];

  const userData = [
    invoice.email,
    invoice.tax_id,
    "**** **** **** " + invoice.card_no,
    invoice.cost + "$",
    invoice.date,
  ];

  userRows.push(userData);
  doc.autoTable(userColumn, userRows, { startY: 35 });

  doc.text("Overbooked Invoice", 80, 15);
  doc.text("ID: " + invoice.invoice_id, 14, 30);
  doc.save(`overbooked-${invoice.invoice_id}-invoice.pdf`);
};

const viewPDF = (invoice) => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ["Amount", "Product Name", "Cost"];
  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
  for (let i = 0; i < invoice.products[0].length; i++) {
    {
      const invoiceData = [
        invoice.products[2][i],
        invoice.products[1][i],
        invoice.products[0][i] + "$",
      ];
      tableRows.push(invoiceData);
    }
  }
  doc.autoTable(tableColumn, tableRows, { startY: 55 });

  // startY is basically margin-top
  // we use a date string to generate our filename.
  // ticket title. and margin-top + margin-left

  const userColumn = ["E-Mail", "Tax ID", "Card No", "Total Cost", "Date"];
  const userRows = [];

  const userData = [
    invoice.email,
    invoice.tax_id,
    "**** **** **** " + invoice.card_no,
    invoice.cost + "$",
    invoice.date,
  ];

  userRows.push(userData);
  doc.autoTable(userColumn, userRows, { startY: 35 });

  doc.text("Overbooked Invoice", 80, 15);
  doc.text("ID: " + invoice.invoice_id, 14, 30);
  // we define the name of our PDF file.
  doc.output("dataurlnewwindow");
};

export { savePDF, viewPDF };
