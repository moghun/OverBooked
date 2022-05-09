import React from 'react';
import  ReactDOM  from 'react-dom';
import {isTSAnyKeyword} from '@babel/types';
import Profile from '../product-view/Profile';
it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<Profile/>, div);
})