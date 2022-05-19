import React from 'react';
import  ReactDOM  from 'react-dom';
import {isTSAnyKeyword} from '@babel/types';
import ShoppingCart from '../ShoppingCart';
it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<ShoppingCart/>, div);
})