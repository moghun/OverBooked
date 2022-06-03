import React from 'react';
import  ReactDOM  from 'react-dom';
import {isTSAnyKeyword} from '@babel/types';
import EditSales from '../profilePage/sales-manager/EditSales';
it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<EditSales/>, div);
})