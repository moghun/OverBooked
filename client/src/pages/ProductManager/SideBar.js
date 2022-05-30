import React from 'react';
import {
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from 'react-bootstrap';


import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import CommentIcon from '@material-ui/icons/Comment';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const SideBar = () => {
return (
    <div>
      <Nav.Item>
        <Nav.Link eventKey='disabled' disabled>
          Product Manager
        </Nav.Link>
      </Nav.Item>

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
        <Nav.Link href='/addProduct' eventKey='c'>
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