import React from 'react';
import  ReactDOM  from 'react-dom';
import {isTSAnyKeyword} from '@babel/types';
import MyOrders from '../MyOrders/MyOrders';

it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<MyOrders/>, div);
})