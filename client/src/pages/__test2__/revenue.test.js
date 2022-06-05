import React from 'react';
import  ReactDOM  from 'react-dom';
import {isTSAnyKeyword} from '@babel/types';
import Revenues from '../profilePage/sales-manager/Revenues';
it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<Revenues/>, div);
})