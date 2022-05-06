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

//COMMENTS THAT DOES NOT APPROVED YET

