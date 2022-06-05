import React from 'react';
import  ReactDOM  from 'react-dom';
import {isTSAnyKeyword} from '@babel/types';
import CancellationRequest from "../profilePage/sales-manager/CancellationRequest";
it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<CancellationRequest/>, div);
})