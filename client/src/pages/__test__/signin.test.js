import React from 'react';
import  ReactDOM  from 'react-dom';
import {isTSAnyKeyword} from '@babel/types';
import Signin from '../signin/Signin';
it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<Signin/>, div);
})