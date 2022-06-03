import React from 'react';
import  ReactDOM  from 'react-dom';
import {isTSAnyKeyword} from '@babel/types';
import Popup from '../MyOrders/Popup';
it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<Popup/>, div);
})