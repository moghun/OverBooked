import React from 'react';
import  ReactDOM  from 'react-dom';
import {isTSAnyKeyword} from '@babel/types';
import SearchPage from '../search-page/SearchPage';
it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<SearchPage/>, div);
})