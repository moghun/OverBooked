import "./NavigationBar.css"
const NavigationBar2= () =>{



  /*



  const [allprod, settallprod] = useState([]);

  const getAllProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/products");
      settallprod(res.data);
      return res.data;
    } catch (err) {}
  };


  useEffect(() => {
    getAllProducts();
  }, []);

        <li class="menu-category">
        <a href="#" class="menu-title">Science</a>

        <ul class="dropdown-list">

          {allprod.slice(0,3).map((AllSales) => (

            <li class="dropdown-item">
              {AllSales.name}
            </li>

          ))}

        </ul>
      </li>

  */
    return (


        <nav class="desktop-navigation-menu">

        <div class="containerw">
  
          <ul class="desktop-menu-category-list">
  
            <li class="menu-category">
              <a href="\" class="menu-title">Home</a>
            </li>

            <li class="menu-category">
              <a href="\myorders" class="menu-title">my-Orders</a>
            </li>



            <li class="menu-category">
              <a href="#" class="menu-title">Science</a>
  
              <ul class="dropdown-list">
  
                <li class="dropdown-item">
                  <a href="#">product 1</a>
                </li>
  
                <li class="dropdown-item">
                  <a href="#">product 2</a>
                </li>
  
                <li class="dropdown-item">
                  <a href="#">product 3</a>
                </li>
  
                <li class="dropdown-item">
                  <a href="#">product 4</a>
                </li>
  
              </ul>
            </li>
  
            <li class="menu-category">
              <a href="#" class="menu-title">Magazine</a>
  
              <ul class="dropdown-list">
  
                <li class="dropdown-item">
                  <a href="#">product 1</a>
                </li>
  
                <li class="dropdown-item">
                  <a href="#">product 2</a>
                </li>
  
                <li class="dropdown-item">
                  <a href="#">product 3</a>
                </li>
  
                <li class="dropdown-item">
                  <a href="#">product 4</a>
                </li>
  
              </ul>
            </li>
  
            <li class="menu-category">
              <a href="#" class="menu-title">Science</a>
  
              <ul class="dropdown-list">
  
                <li class="dropdown-item">
                  <a href="#">product 1</a>
                </li>
  
                <li class="dropdown-item">
                  <a href="#">product 2</a>
                </li>
  
                <li class="dropdown-item">
                  <a href="#">product 3</a>
                </li>
  
                <li class="dropdown-item">
                  <a href="#">product 4</a>
                </li>
  
              </ul>
            </li>
  
          </ul>
  
        </div>
  
      </nav>







    );
}
export default NavigationBar2;