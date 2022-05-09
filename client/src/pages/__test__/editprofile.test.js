import React from 'react';
import  ReactDOM  from 'react-dom';
import {isTSAnyKeyword} from '@babel/types';
import EditProfile from '../product-view/EditProfile';
it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<EditProfile/>, div);
})