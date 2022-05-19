import React from 'react';
import  ReactDOM  from 'react-dom';
import NavigationBar2 from '../Navigation_Bar/NavigationBar2';
import {isTSAnyKeyword} from '@babel/types';

it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<NavigationBar2/>, div);
})