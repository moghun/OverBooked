import { padding } from '@mui/system';
import React, { useState, useEffect } from 'react';
import {FaStar} from 'react-icons/fa';
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useSelector } from "react-redux";
import '../product-managerPage/CommentApprove.css';
/*
//ALL COMMENTS TO BE APPROVE
const getComments = async () => {
    try{
        const res = await axios.get("http://localhost:5001/api/products/commentApproval");
        return res.data;
    } catch (err){}
}

const getUnapprovedComments = (productsWithComments) => {
    let returnArr = []
    for (product in productsWithComments)
    {
        for (comment in product.comments)
        {
            if(comment.isApproved == false)
            {
                returnArr.push({product_id: product._id, initCommit: comment})
            }
        }
    }
    return returnArr;
}

const approveComment = async (product_id, comment_no) => {
    try{
        const res = await axios.put("http://localhost:5001/api/products/commentApproval/" + product_id + "/" + comment_no);
    } catch (err){}   
}

const disapproveComment = async (product_id, comment_no) => {
    try{
        const res = await axios.put("http://localhost:5001/api/products/commentApproval/delete/" + product_id + "/" + comment_no);
    } catch (err){}   
}

const comments = getComments();
const unappCommennts = getUnapprovedComments(comments);

//Assume that products cards are visualized here, product-manager now can select a comment to approve

//EXAMPLE APPROVE - DISAPPROVE COMMENT - user clicked to a comment for approval
const demoExecution = () =>{
    //Assume that s/he clicked to the first unapproved comment for approving
    const commentToApprove1 = unappCommennts[0];
    approveComment(commentToApprove1.product_id, commentToApprove1.initCommit);


    //Assume that s/he clicked to the second unapproved comment for disapproving
    const commentToDisapprove2 = unappCommennts[1];
    disapproveComment(commentToDisapprove2.product_id, commentToDisapprove2.initCommit)
}
*/
const CommentApprove = () => {
    const currUser = useSelector((state) => state.user.currentUser);

    console.log(currUser);
    const getComments = async () => {
        try{
            const res = await axios.get("http://localhost:5001/api/products/commentApproval", {headers: {token: ("Bearer "+ currUser.accessToken)}});
            return res.data;
        } catch (err){}
    }

    
    const getUnapprovedComments = (productsWithComments) => {
        let returnArr = []


        console.log(productsWithComments)

        for (var product in productsWithComments)
        {

            for (var comment in product.comments)
            {
                if(comment.isApproved === false)
                {
                    returnArr.push({product_id: product._id, initCommit: comment})
                }
            }
        }
        return returnArr;
    }

    const approveComment = async (product_id, comment_no) => {
        try{
            const res = await axios.put("http://localhost:5001/api/products/commentApproval/" + product_id + "/" + comment_no, {headers: {token: ("Bearer "+ currUser.accessToken)}});
        } catch (err){}   
    }

    const disapproveComment = async (product_id, comment_no) => {
        try{
            const res = await axios.put("http://localhost:5001/api/products/commentApproval/delete/" + product_id + "/" + comment_no, {headers: {token: ("Bearer "+ currUser.accessToken)}});
        } catch (err){}   
    }

    const comments = getComments().then(result => result.data);
    const unappCommennts = getUnapprovedComments(comments);
    console.log(unappCommennts);

    return (
        <div className='approval-holder'>
  
        <div className='Row'>
    
          <div className='approval-container'>
            <div>
    
              {unappCommennts.length === 0 
              ? <h1 style={{padding: "50px",textAlign:'center'}}>You have no comment waiting approval.</h1>
              
              :
              unappCommennts.map((item)=>{
                    return (
                      <div className="approval-column"style={{padding: '10px', margin:'20px'}}>
                        <h style={{marginLeft: '25px', fontWeight:'bold', marginRight:'20px'}}>Product ID:{item.product_id}</h>
                        <h style={{marginLeft: '50px',marginRight:-20, fontWeight:'bold'}}>Comment:{item.initCommit} </h>
                        <input type = "submit" onClick={approveComment(item.product_id, item.initCommit)} value = "Approve"  style={{backgroundColor: 'lightgreen', marginLeft: '300px',width:"100px",borderRadius:'5px'}}/>
                        <input type = "submit" onClick={disapproveComment(item.product_id, item.initCommit)} value = "Disapprove"  style={{backgroundColor: 'red',marginLeft: '50px', width:"100px",borderRadius:'5px'}}/>
                      </div>
                  );})}
    
            </div>
          </div>
        </div>
        </div>
      )
}

export default CommentApprove;