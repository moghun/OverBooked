import React, { useState, useEffect } from "react";

import "./ProductManager.css";
import axios from "axios";
import { useSelector } from "react-redux";

const Invoices = () => {
  const currUser = useSelector((state) => state.user.currentUser);

  const [All, setAll] = useState([]);

  useEffect(() => {
    const clickGet = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5001/api/productmanager/getinvoices",
          {
            headers: { token: "Bearer " + currUser.accessToken },
          }
        );
        let holder = [];
        res.data.forEach((element) => {
          element.forEach((item) => {
            holder.push(item);
          });
        });
        setAll(holder);
      } catch (err) {
        console.log(err);
      }
    };
    clickGet();
  }, []);

  return (
    <div>
      <div>
        <div className="px-4 px-lg-0">
          <div className="container text-black py-5 text-center">
            <h1
              className="pcontainer"
              style={{ fontSize: 50, marginLeft: 270, color: "black" }}
            >
              Invoices
            </h1>
          </div>
        </div>
      </div>
      <div className="containerW1">
        <br />
        <div>
          <table class="table col-1" style={{ marginLeft: "50px" }}>
            <thead>
              <tr>
                <th class="col-1" scope="col" className="border-0 bg-light">
                  <div style={{ fontSize: "20px" }}>Customer Username</div>
                </th>
                <th class="col-1" scope="col" className="border-0 bg-light">
                  <div style={{ fontSize: "20px" }}>Delivery Adress</div>
                </th>
                <th class="col-1" scope="col" className="border-0 bg-light">
                  <div style={{ fontSize: "20px" }}> Delivery ID</div>
                </th>

                <th class="col-1" scope="col" className="border-0 bg-light">
                  <div style={{ fontSize: "20px" }}>E-MAIL</div>
                </th>

                <th class="col-1" scope="col" className="border-0 bg-light">
                  <div style={{ fontSize: "20px" }}>Quantity</div>
                </th>

                <th class="col-1" scope="col" className="border-0 bg-light">
                  <div style={{ fontSize: "20px" }}>Delivery Status</div>
                </th>

                <th class="col-1" scope="col" className="border-0 bg-light">
                  <div style={{ fontSize: "20px" }}>Total Price</div>
                </th>
              </tr>
            </thead>
            {All.map((item) => {
              return (
                <tbody>
                  <tr>
                    <td class="col-1" style={{ background: "white" }}>
                      <strong style={{ fontSize: "10px" }}>
                        {item.username}{" "}
                      </strong>
                    </td>

                    <td class="col-1" style={{ background: "white" }}>
                      <strong style={{ fontSize: "10px" }}>
                        {item.adress}
                      </strong>
                    </td>

                    <td class="col-1" style={{ background: "white" }}>
                      <strong style={{ fontSize: "10px" }}>
                        {item.invoice_id}{" "}
                      </strong>
                    </td>
                    <td class="col-1" style={{ background: "white" }}>
                      <strong style={{ fontSize: "10px" }}>
                        {item.email}{" "}
                      </strong>
                    </td>
                    <td class="col-1" style={{ background: "white" }}>
                      {item.products[1].map((prd, i) => {
                        return (
                          <>
                            <div style={{ fontSize: "10px" }}>
                              <strong>
                                {prd + " x" + item.products[2][i]}
                              </strong>
                            </div>
                            <br></br>
                          </>
                        );
                      })}
                    </td>
                    <td class="col-1" style={{ background: "white" }}>
                      <strong style={{ fontSize: "10px" }}>
                        {item.status}{" "}
                      </strong>
                    </td>

                    <td class="col-1" style={{ background: "white" }}>
                      <strong style={{ fontSize: "10px" }}>
                        {item.cost + "$"}{" "}
                      </strong>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
        <br style={{ marginBottom: "2px" }} />
      </div>
    </div>
  );
};

export default Invoices;
