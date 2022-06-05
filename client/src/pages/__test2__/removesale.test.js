import React from 'react';
import  ReactDOM  from 'react-dom';
import {isTSAnyKeyword} from '@babel/types';
import RemoveSale from '../profilePage/sales-manager/RemoveSale';
it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<RemoveSale/>, div);
})