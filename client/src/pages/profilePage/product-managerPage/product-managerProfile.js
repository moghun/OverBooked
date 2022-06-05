import { padding } from "@mui/system";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "../product-managerPage/CommentApprove.css";

function ProductManagerAPI() {
  const CurrUser = useSelector((state) => state.user.currentUser);

  const [comments, setComments] = useState([]);
  const [unappCommennts, setUnappComments] = useState([]);
  const [product, setProduct] = useState({});

  const getComments = async (CurrUser) => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/products/commentApproval",
        { headers: { token: "Bearer " + CurrUser.accessToken } }
      );
      setComments(res.data);
    } catch (err) {}
  };

  const getUnapprovedComments = (productsWithComments) => {
    let returnArr = [];
    for (let product in productsWithComments) {
      for (let comment in productsWithComments[product].comments) {
        if (
          productsWithComments[product].comments[comment].isApproved === false
        ) {
          returnArr.push({
            product_id: productsWithComments[product]._id,
            product_name: productsWithComments[product].name,
            initCommit: productsWithComments[product].comments[comment].comment,
            comment_id:
              productsWithComments[product].comments[comment].comment_id,
            user_id: productsWithComments[product].comments[comment].user_id,
          });
        }
      }
    }
    return returnArr;
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        setProduct({});
      } catch {}
    };
    getProduct();
  }, []);

  useEffect(async () => {
    getComments(CurrUser);
  }, []);

  useEffect(() => {
    const result = getUnapprovedComments(comments);
    setUnappComments(result);
  }, [comments]);

  const approveComment = async (product_id, comment_no, curr_comment, uid) => {
    const commentStruct = {
      comment_id: comment_no,
      user_id: uid,
      comment: curr_comment,
      isApproved: true,
    };

    try {
      await axios.put(
        "http://localhost:5001/api/products/commentApproval/" +
          product_id +
          "/" +
          comment_no,
        commentStruct,
        { headers: { token: "Bearer " + CurrUser.accessToken } }
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const disapproveComment = async (product_id, comment_no) => {
    try {
      await axios.put(
        "http://localhost:5001/api/products/commentApproval/delete/" +
          product_id +
          "/" +
          comment_no,
        undefined,
        { headers: { token: "Bearer " + CurrUser.accessToken } }
      );
      window.location.reload();
    } catch (err) {}
  };

  return (
    <div className="approval-holder">
      <div className="Row">
        <div className="approval-container">
          <div>
            {unappCommennts.length === 0 ? (
              <h1 style={{ padding: "50px", textAlign: "center",  outline:'none', border:'none', color:"#FAFAFA" }}>
                You have no comment waiting approval
              </h1>
            ) : (
              unappCommennts.map((item) => (
                <div
                  key={item.comment_no}
                  className="approval-column"
                  style={{ padding: "10px", margin: "20px" }}
                >
                    <div style={{width:"425px"}}>
                    <input
                          disabled="disabled"
                          type="text"
                          value={"ID: " + item.product_id}
                          style={{
                            color: "black",
                            borderRadius: "10px",
                            backgroundColor: "aliceblue",
                            marginLeft: "10px",
                            width: "400px",
                            border: "none",
                            outline: "none",
                          }}
                          readonly
                        ></input>
                                             <input
                          disabled="disabled"
                          type="text"
                          value={"Name: " + item.product_name}
                          style={{
                            color: "black",
                            borderRadius: "10px",
                            backgroundColor: "aliceblue",
                            marginLeft: "10px",
                            width: "400px",
                            border: "none",
                            outline: "none",
                          }}
                          readonly
                        ></input>
                    </div>

                  <textarea
                      disabled="disabled"
                      type="text"
                      value={"Comment: " + item.initCommit}
                      style={{
                        color: "black",
                        borderRadius: "10px",
                        backgroundColor: "aliceblue",
                        marginLeft: "10px",
                        width: "300px",
                        height: "50px",
                        border: "none",
                        outline: "none",
                        resize: "none",
                        fontSize: "14px",
                      }}
                      readonly
                    ></textarea>

                  <input
                    type="submit"
                    onClick={() =>
                      approveComment(
                        item.product_id,
                        item.comment_id,
                        item.initCommit,
                        item.user_id
                      )
                    }
                    value="Approve"
                    style={{
                      backgroundColor: "lightgreen",
                      marginLeft: "50px",
                      width: "100px",
                      borderRadius: "5px",
                      outline:'none',
                      border:'none'
                    }}
                  />
                  <input
                    type="submit"
                    onClick={() =>
                      disapproveComment(item.product_id, item.comment_id)
                    }
                    value="Disapprove"
                    style={{
                      backgroundColor: "red",
                      marginLeft: "25px",
                      width: "100px",
                      borderRadius: "5px",
                      outline:'none',
                      border:'none'
                    }}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductManagerAPI;
