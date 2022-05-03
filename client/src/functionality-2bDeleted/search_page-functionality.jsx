import axios from "axios"


//Add to the search_page and search_bar

const getAllProducts = async () => {
    try{
        const res = await axios.get("http://localhost:5001/api/products");
        return res.data;
    } catch (err){}
}

const getSaleProducts = async () => {
    try{
        const res = await axios.get("http://localhost:5001/api/products?sale=true");
        return res.data;
    } catch (err){}
}

const getCategoryProducts = async (cat) => {
    try{
        const res = await axios.get("http://localhost:5001/api/products?category="+cat);
        return res.data;
    } catch (err){}
}

const getSubcategoryProducts = async (subcat) => {
    try{
        const res = await axios.get("http://localhost:5001/api/products?subcategory="+subcat);
        return res.data;
    } catch (err){}
}


const findProduct = async (query) => {
    try{
        const res = await axios.get("http://localhost:5001/api/products/find?q="+query);
        return res.data;
    } catch (err){}
}
