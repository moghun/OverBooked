import React from 'react';
import  ReactDOM  from 'react-dom';
import {isTSAnyKeyword} from '@babel/types';
import SetPrice from '../profilePage/sales-manager/SetPrice';
it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<SetPrice/>, div);
})