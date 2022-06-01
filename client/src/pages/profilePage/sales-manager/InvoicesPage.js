import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./invoce.css";
import Button from "@material-ui/core/Button";
import PrintIcon from "@mui/icons-material/Print";
import DownloadIcon from "@mui/icons-material/Download";
import TextField from "@material-ui/core/TextField";
import { Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import axios from "axios";
import { savePDF, viewPDF } from "./invoiceRenderer";
import { format } from "date-fns";
function InvoicesPage() {
  const [starting, setStarting] = useState(null);
  const [ending, setEnding] = useState(null);
  const [rows, setRows] = useState();
  const [filtered, setFiltered] = useState([]);

  const currUser = useSelector((state) => state.user.currentUser);
  const getInvoices = async () => {
    try {
      await axios
        .get(
          "http://localhost:5001/api/users/getInvoices/", //Current products' ID here
          undefined, //Take current products' before_sale_cost here
          {
            headers: { token: "Bearer " + currUser.accessToken },
          }
        )
        .then((res) => {
          let invoicesArr = [];
          res.data.forEach((inv) => {
            invoicesArr.push(inv);
          });
          setRows(invoicesArr);
          console.log(invoicesArr);
          setFiltered(invoicesArr);
        });
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getInvoices();
  }, []);

  function clearFilter() {
    setStarting(null);
    setEnding(null);
    setFiltered(rows);
  }

  function checkDate(date) {
    return starting <= date && date <= ending;
  }

  function filterDate() {
    if (starting === null || ending === null) {
      toast.error("Date cannot be left empty!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
    } else if (starting > ending) {
      toast.error("Starting cannot be greater than ending!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
    } else {
      setFiltered(rows.filter((item) => checkDate(item.date)));
      console.log(filtered);
      //alert(ending + starting)
    }
  }

  /*
      function alertInfo(item){
        alert("Date: " + item.date + "\nID: " + item.id + "\nFullName: " + item.fullName);
      }
      */

  const columns = [
    {
      field: "invoice_id",
      headerName: "Invoice ID",
      width: 150,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "username",
      headerName: "Username",
      width: 200,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "date",
      headerName: "Date",
      width: 200,
      valueFormatter: (params) => {
        // first converts to JS Date, then to locale option through date-fns
        return format(params.value, "dd/MM/yyyy");
      },
    },
    {
      field: "print",
      headerName: "Print",
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <>
            {" "}
            <Button
              onClick={() => {
                viewPDF(params.row);
              }}
              style={{
                outline: "none",
                width: "100px",
                fontFamily: "OpenSans",
              }}
              variant="outlined"
            >
              View
            </Button>
          </>
        );
      },
    },
    {
      field: "save",
      headerName: "Save",
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <>
            {" "}
            <Button
              onClick={() => {
                savePDF(params.row);
              }}
              style={{
                outline: "none",
                width: "100px",
                fontFamily: "OpenSans",
              }}
              variant="outlined"
              startIcon={<DownloadIcon />}
            >
              Save
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <div
      className="invoice-container"
      style={{ width: "60%", marginLeft: "20%" }}
    >
      <form>
        <TextField
          id="startdate"
          InputProps={{ inputProps: { min: 0, max: 100 } }}
          label="Starting Date"
          margin="normal"
          style={{ width: "25%", marginLeft: "5%", marginRight: "5%" }}
          onChange={(e) => {
            setStarting(e.target.value);
          }}
        />
        <TextField
          id="enddate"
          InputProps={{ inputProps: { min: 0, max: 100 } }}
          onChange={(e) => {
            setEnding(e.target.value);
          }}
          label="Ending Date"
          margin="normal"
          style={{ width: "25%" }}
        />

        <Button
          onClick={filterDate}
          style={{ outline: "none", marginTop: "24px", marginLeft: "15px" }}
          color="primary"
          variant="contained"
        >
          Filter
        </Button>
        <Button
          type="reset"
          onClick={clearFilter}
          style={{ outline: "none", marginTop: "24px", marginLeft: "15px" }}
          color="primary"
          variant="contained"
        >
          Clear
        </Button>
        <Button
          color="secondary"
          href="/profile"
          variant="contained"
          style={{ outline: "none", marginTop: "24px", marginLeft: "15px" }}
        >
          Cancel
        </Button>
      </form>

      <Container sx={{ height: 500, width: 800 }}>
        <DataGrid
          rows={filtered}
          getRowId={(row) => row.invoice_id}
          columns={columns}
          pageSize={5}
          headerHeight={75}
          rowHeight={65}
          disableSelectionOnClick
        />
      </Container>
    </div>
  );
}

export default InvoicesPage;