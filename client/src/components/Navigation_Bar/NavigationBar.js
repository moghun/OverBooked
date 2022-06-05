import "./NavigationBar.css";
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { logout } from "../../redux/apiCalls";
import { clearCart } from "../../redux/cartRedux";
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { Button } from "@material-ui/core";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';


import Badge from '@material-ui/core/Badge'



const NavigationBar = () => {
  const currUser = useSelector((state) => state.user.currentUser);
  const cartnumber = useSelector((state) => state.cart.amount);

  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();


  const handleClick = () => {
    logout(dispatch, currUser);
    dispatch(clearCart());
  };

  const onValueChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <nav className="navbar">
      <i class="material-icons menu-icon">menu</i>

      <div class="logo">
        <a
          href="/"
          class="text"
          style={{ fontWeight: "bold", color: "white", textDecoration: "none" }}
        >
          OverBooked
        </a>
      </div>

      <div class="item search right" tabindex="0">
        <div class="search-group">
          <input type="text" onChange={onValueChange} value={searchValue} placeholder= "SEARCH" />
          <form action={"/searchpage/" + searchValue} method="get">
            <button className="--btn --btn-primary">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/2048px-Search_Icon.svg.png"
                alt="search"
              />
            </button>
          </form>
        </div>
      </div>

      {currUser === null ? (

          <Button href="/signin" startIcon = {<AccountBoxIcon/>}>
          </Button>
      ) : (
        
        <div class = "nav-row">

          <Button startIcon={<FavoriteIcon/>} href= "/wishlist">
             <Badge invisible={false} color="secondary" style={{marginLeft: '10%'}}>
            </Badge>
          </Button>

          <Button href="/profile" startIcon = {<AccountBoxIcon/>}>
          </Button>

          <Button startIcon={<PowerSettingsNewIcon/>} onClick={handleClick}>
        </Button>
        </div>
      )}

      <Button href="/shoppingcart" startIcon = {<ShoppingCartIcon/>}>
            <Badge invisible={false} badgeContent={cartnumber} color="secondary" style={{marginLeft: '20%'}}>
            </Badge>
      </Button>
    </nav>
  );
};
export default NavigationBar;
