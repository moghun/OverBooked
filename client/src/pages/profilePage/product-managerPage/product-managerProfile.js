import { padding } from '@mui/system';
import React, { useState, useEffect } from 'react';
import {FaStar} from 'react-icons/fa';
import { publicRequest } from "../requestMethods";
import { useLocation } from "react-router-dom";
import { addProduct } from "../../redux/cartRedux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useSelector } from "react-redux";

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