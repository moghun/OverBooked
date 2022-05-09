import React from 'react';
import  ReactDOM  from 'react-dom';
import {isTSAnyKeyword} from '@babel/types';
import HomePage from '../homepage/Home';
it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<HomePage/>, div);
})