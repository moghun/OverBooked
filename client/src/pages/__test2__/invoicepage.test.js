import React from 'react';
import  ReactDOM  from 'react-dom';
import {isTSAnyKeyword} from '@babel/types';
import InvoicesPage from '../profilePage/sales-manager/InvoicesPage';
it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<InvoicesPage/>, div);
})