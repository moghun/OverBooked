import React from 'react';
import  ReactDOM  from 'react-dom';
import {isTSAnyKeyword} from '@babel/types';
import CancelPopup from '../MyOrders/CancelPopUp';
it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<CancelPopup/>, div);
})