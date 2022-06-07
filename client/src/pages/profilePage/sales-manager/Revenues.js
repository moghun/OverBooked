import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TextField, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import ArrowCircleUpTwoToneIcon from "@mui/icons-material/ArrowCircleUpTwoTone";
import ArrowCircleDownTwoToneIcon from "@mui/icons-material/ArrowCircleDownTwoTone";

const Revenues = () => {
  const [starting, setStarting] = useState(null);
  const [ending, setEnding] = useState(null);
  const [rows, setRows] = useState();
  const [filtered, setFiltered] = useState([]);
  const [totalRevenue, setTotal] = useState(null);
  const [totalCost, setCost] = useState(null);

  const currUser = useSelector((state) => state.user.currentUser);

  function clearFilter() {
    setStarting(null);
    setEnding(null);
    setFiltered(rows);
  }

  const getAllProducts = async () => {
    try {
      const res = await axios
        .get("http://localhost:5001/api/products?sale=false")
        .then((res) => {
          let carrier = 0;
          res.data.forEach((pr) => {
            carrier = carrier + pr.cost * pr.amount;
          });
          setCost(carrier);
        });
    } catch (err) {}
  };

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
          let carrier = 0;
          res.data.forEach((inv) => {
            carrier = carrier + inv.cost;
            invoicesArr.push(inv);
          });
          setRows(invoicesArr);
          setTotal(carrier);
          setFiltered(invoicesArr);
        });
    } catch (err) {
      toast.error(err, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
    }
  };

  useEffect(() => {
    getInvoices();
    getAllProducts();
  }, []);

  const convertToDate = (d) => {
    const [month, day, year] = d.split("/");
    return new Date(year, month - 1, day);
  };

  function checkDate(date) {
    return (
      convertToDate(starting) <= convertToDate(date) &&
      convertToDate(date) <= convertToDate(ending)
    );
  }

  function filterDate() {
    if (starting === null || ending === null) {
      toast.error("Date cannot be left empty!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
    } else if (convertToDate(starting) > convertToDate(ending)) {
      toast.error("Starting cannot be greater than ending!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
    } else {
      setFiltered(rows.filter((item) => checkDate(item.date)));
    }
  }
  //      <h3 className="chartTitle" style={{fontFamily:'OpenSans'}}>Monthly Revenue</h3>

  return (
    <div
      className="revenue-container"
      style={{ border: "none", borderRadius: "20px" }}
    >
      <div
        className="revenue-container-inner"
        style={{
          boxShadow: "0 0 5px #ccc",
          borderRadius: "20px",
          marginTop: "25px",
          marginBottom: "25px",
          marginLeft: "25px",
          marginRight: "25px",
          padding: "10px",
        }}
      >
        <div style={{ marginBottom: "5px", marginTop: "-15px" }}>
          <div
            className="revenue-container-inner"
            style={{
              textAlign: "center",
              boxShadow: "0 0 5px #ccc",
              borderRadius: "20px",
              width: "375px",
              marginTop: "25px",
              marginLeft: "450px",
              marginRight: "25px",
              padding: "10px",
            }}
          >
            <h5 style={{ margin: "0px", fontFamily: "OpenSans" }}>REVENUES</h5>
          </div>
        </div>

        <div
          style={{ display: "flex", marginBottom: "10px", marginTop: "-10px" }}
        >
          <div
            className="revenue-container-inner"
            style={{
              textAlign: "center",
              boxShadow: "0 0 5px #ccc",
              borderRadius: "20px",
              width: "400px",
              height: "100px",
              marginTop: "25px",
              marginLeft: "25px",
              marginRight: "25px",
              padding: "10px",
            }}
          >
            <h2
              style={{
                margin: "0px",
                fontFamily: "OpenSans",
                marginBottom: "5px",
              }}
            >
              Total Revenue
            </h2>
            <h5 style={{ margin: "0px", fontFamily: "OpenSans" }}>
              {totalRevenue} USD
            </h5>
          </div>

          <div
            className="revenue-container-inner"
            style={{
              textAlign: "center",
              boxShadow: "0 0 5px #ccc",
              borderRadius: "20px",
              width: "400px",
              height: "100px",
              marginTop: "25px",
              marginLeft: "25px",
              marginRight: "25px",
              padding: "10px",
            }}
          >
            {totalRevenue < totalCost ? (
              <>
                <h2
                  style={{
                    margin: "0px",
                    fontFamily: "OpenSans",
                    marginBottom: "5px",
                  }}
                >
                  Financial Position
                </h2>
                <h5 style={{ margin: "0px", fontFamily: "OpenSans" }}>
                  {totalCost - totalRevenue} USD
                  {"   "}
                  <ArrowCircleDownTwoToneIcon
                    style={{ color: "red", fontSize: "36px" }}
                  />
                </h5>
              </>
            ) : (
              <>
                <h2
                  style={{
                    margin: "0px",
                    fontFamily: "OpenSans",
                    marginBottom: "5px",
                  }}
                >
                  Financial Position
                </h2>
                <h5 style={{ margin: "0px", fontFamily: "OpenSans" }}>
                  {totalRevenue - totalCost} USD
                  {"   "}
                  <ArrowCircleUpTwoToneIcon
                    style={{ color: "green", fontSize: "36px" }}
                  />
                </h5>
              </>
            )}
          </div>

          <div
            className="revenue-container-inner"
            style={{
              textAlign: "center",
              boxShadow: "0 0 5px #ccc",
              borderRadius: "20px",
              width: "400px",
              height: "100px",
              marginTop: "25px",
              marginLeft: "25px",
              marginRight: "25px",
              padding: "10px",
            }}
          >
            <h2
              style={{
                margin: "0px",
                fontFamily: "OpenSans",
                marginBottom: "5px",
              }}
            >
              Total Cost
            </h2>
            <h5 style={{ margin: "0px", fontFamily: "OpenSans" }}>
              {totalCost} USD
            </h5>
          </div>
        </div>

        <div className="chart">
          <ResponsiveContainer width="100%" aspect={4 / 1}>
            <LineChart data={filtered}>
              <XAxis dataKey="date" stroke="#5550bd" />
              <Line type="monotone" dataKey="cost" stroke="#5550bd" />
              <Tooltip />
              {<CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="filterings">
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
              id="endingdate"
              InputProps={{ inputProps: { min: 0, max: 100 } }}
              label="Ending Date"
              margin="normal"
              style={{ width: "25%", marginLeft: "5%", marginRight: "5%" }}
              onChange={(e) => {
                setEnding(e.target.value);
              }}
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
        </div>
      </div>
    </div>
  );
};

export default Revenues;
