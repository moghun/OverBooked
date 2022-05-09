import React from 'react';
import  ReactDOM  from 'react-dom';
import {isTSAnyKeyword} from '@babel/types';
import SignUp from '../signup/Signup';
it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<SignUp/>, div);
})