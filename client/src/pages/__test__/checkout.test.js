import React from 'react';
import  ReactDOM  from 'react-dom';
import {isTSAnyKeyword} from '@babel/types';
import Checkout from '../Checkout';
it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<Checkout/>, div);
})