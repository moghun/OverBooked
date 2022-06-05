import React, {useState, useEffect} from 'react';

import "./ProductManager.css"
import axios from "axios";
import { useSelector } from "react-redux";

const Invoices = () => {


  const currUser = useSelector((state) => state.user.currentUser);


  const [All, setAll] = useState([]);

  

  useEffect(() => {
    const clickGet = async () => {

      try {
        const res = await axios.get("http://localhost:5001/api/productmanager/getinvoices",{
          headers: { token: "Bearer " + currUser.accessToken },
        });
        let holder = []
        res.data.forEach(element => {
          element.forEach((item)=>{holder.push(item)})
          
        });
        console.log(res.data);
        setAll(holder);
      } catch (err) {
        console.log(err);
      }
    }; 
    clickGet();
  }, []);



  console.log(All);

    return (

      <div>
        <div>
        <div className='px-4 px-lg-0'>
          <div className='container text-black py-5 text-center'>
            <h1 className='pcontainer' style={{ fontSize: 20, marginLeft: 270, color: 'black' }}>
              Invoices
            </h1>
          </div>
        </div>
        </div>
          <div className="containerW1">
            <br/>
          <div class = "table-responsive">
          <table class="table table-hover table-responsive table-sm">
            <thead style={{fontSize:"2px"}}>
              <tr>
                <th class="col-1">
                  <div>
                    Customer Name
                  </div>
                </th>
                <th class="col-1">
                  <div>
                    DELIVERY Adress
                  </div>
                </th>
                <th class="col-1">
                  <div> Delivery ID</div>
                </th>

                <th class="col-1">
                  <div>E-MAIL</div>
                </th>

                <th class="col-1">
                  <div>Quantity</div>
                </th>

                <th class="col-1">
                  <div>Delivery Status</div>
                </th>


                <th class="col-1">
                  <div>Total Price</div>
                </th>

              </tr>
            </thead>
            {All.map((item) => {
              console.log(item);
              
              return (
                <tbody>
                  <tr>
                    <td class="col-1">
                      <strong style={{fontSize:'10px'}}>{item.name} </strong>
                    </td>

                    <td class="col-1">
                    <strong style={{fontSize:'10px'}}>{item.adress}</strong>
                    </td>

                    <td class="col-1">
                      <strong style={{fontSize:'10px'}}>{item.invoice_id} </strong>
                    </td>
                    <td class="col-1">
                      <strong style={{fontSize:'10px'}}>{item.email} </strong>
                    </td>
                    <td class="col-1">
                      {item.products[1].map((prd, i)=>{
                        return(
                          <>
                          <div style={{fontSize:'10px'}}><strong>{prd + " " +item.products[2][i] + " ITEM"}</strong></div>
                          </>
                        )
                      })}
                    </td>
                    <td class="col-1">
                      <strong style={{fontSize:'10px'}}>{item.status} </strong>
                    </td>  


                    <td class="col-1">
                      <strong style={{fontSize:'10px'}}>{item.cost + "$"} </strong>
                    </td>                     
                  </tr>
                </tbody>
              );
            })}
          </table>
          </div>
          <br style={{marginBottom: '2px'}}/>
          </div>
          </div>
    )


}


export default Invoices;