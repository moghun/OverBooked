import React from 'react';
import  ReactDOM  from 'react-dom';
import {isTSAnyKeyword} from '@babel/types';
import  DetailsThumb from '../product-view/ProductPage';
it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<DetailsThumb/>, div);
})