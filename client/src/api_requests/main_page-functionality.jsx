import axios from "axios"


//Add to the main_page

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


const getTopProducts = async () => {
    try{
        const res = await axios.get("http://localhost:5001/api/products?top=10");
        return res.data;
    } catch (err){}
}

const getCategoryProducts = async (cat) => {
    try{
        const res = await axios.get("http://localhost:5001/api/products?category="+cat);
        return res.data;
    } catch (err){}
}
