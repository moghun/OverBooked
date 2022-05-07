import "./NavigationBar.css"
const NavigationBar= () =>{


    const isSigned = false;
    return (

        <nav class="navbar">
            <i class="material-icons menu-icon">menu</i>

            <div class="logo">               
                <a href="/" class="text" style ={{fontWeight: "bold" , color:"white", textDecoration:"none"}} >OverBooked</a>   
            </div>

            <div class="item search right" tabindex="0">
                <div class="search-group">
                    <select>
                        <option value="all">All</option>
                        <option value="all">Books</option>
                        <option value="all">Comics</option>
                        <option value="all">Magazines</option>
                    </select>
                    <input type="text"/>
                    <form action="\searchpage" method="get">
                      <button className="--btn --btn-primary">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/2048px-Search_Icon.svg.png" alt="search"/>
                      </button>
                    </form>

                </div>
            </div>
            
            {!isSigned
            ?            
            <a href="/signin" class="  item">
                <div class="group">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Google_account_icon.svg/803px-Google_account_icon.svg.png" alt="search"/>
                    
                    
                    <div class="detail">
                        Account
                        <div class="sub">Sign In</div>
                    </div>
                </div>
            </a>
            :   
            <div>        
            <a href="/editprofile" class="  item">
                <div class="group">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Google_account_icon.svg/803px-Google_account_icon.svg.png" alt="search"/>
                    
                    
                    <div class="detail">
                        Account
                    </div>
                </div>
            </a>
            <button style={{marginTop:'-10px',marginLeft:'37px', color:'white', outline:'none', marginTop:'-10px'}}>Logout</button>
            </div> 
            
            }


            <a href="" class="item">
                <div class="group">
                    <img class = "cart" src="https://cdn3.iconfinder.com/data/icons/book-shop-category-ouline/512/Book_Shop_Category-10-512.png" alt="search"/>
                
                    <div class="detail">
                        Shopping 
                        <div class="sub">Cart</div>
                    </div>
                </div>
            </a>
        </nav>

    );
}
export default NavigationBar;


/*
        <ul>
            <li><a href="default.asp">Home</a></li>
            <li><a href="news.asp">News</a></li>
            <li><a href="contact.asp">Contact</a></li>
            <li><a href="about.asp">About</a></li>
            <li><input type = "text" ></input></li>
        </ul>

*/ 