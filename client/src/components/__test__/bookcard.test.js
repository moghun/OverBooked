import React from 'react';
import  ReactDOM  from 'react-dom';
import BookCard from '../BookCard';
import {isTSAnyKeyword} from '@babel/types';
import { Book } from '@material-ui/icons';

it("renders without crashing", ()=>{
    const div = document.createElement("div");
    ReactDOM.render(<BookCard/>, div);
})