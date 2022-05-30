import React from 'react';
import {
  Nav,
} from 'react-bootstrap';

import { View,} from "react-native";


import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import CommentIcon from '@material-ui/icons/Comment';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const SideBar = () => {
return (
    <div>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View>
          <View style={{width: 10, textAlign: 'center', color: 'green', fontWeight: "bold", fontSize: 40}}>PRODUCT MANAGER</View>
        </View>
      </View>

      <Nav.Item>
        <Nav.Link href='/Invoices' eventKey='a'>
          <div className='iconwrap'>
          <LocalAtmIcon />
          </div>
          Invoices
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link href='/approveReview' eventKey='b'>
          <div className='iconwrap'>
            <CommentIcon/>
          </div>
          Approve Reviews
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link href='/productmanager' eventKey='c'>
          <div className='iconwrap'>
            <AddShoppingCartIcon/>
          </div>
          Add Product
        </Nav.Link>
      </Nav.Item>
      <br />
    </div>
  );
}


export default SideBar;