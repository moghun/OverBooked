try {
  axios.put(
    "http://localhost:5001/api/products/setCost/" + product_id, //Current products' ID here
    { newCost: newCostHere }, //Set cost here
    {
      headers: { token: "Bearer " + currUser.accessToken },
    }
  );
} catch (err) {
  alert(err);
}

try {
  axios.put(
    "http://localhost:5001/api/products/stopSale/" + product_id, //Current products' ID here
    { cost: currentProduct.before_sale_cost }, //Take current products' before_sale_cost here
    {
      headers: { token: "Bearer " + currUser.accessToken },
    }
  );
} catch (err) {
  alert(err);
}

try {
  axios.put(
    "http://localhost:5001/api/products/setSale/" + product_id, //Current products' ID here
    {
      cost: currentProduct.before_sale_cost, //Take current products' before_sale_cost here
      perc: salePercentage, //Give sale percentage here
    },
    {
      headers: { token: "Bearer " + currUser.accessToken },
    }
  );
} catch (err) {
  alert(err);
}

//Gets products not on SALE
const getAllProducts = async () => {
  try {
    const res = await axios.get(
      "http://localhost:5001/api/products?sale=false"
    );
    return res.data;
  } catch (err) {}
};

//Gets products on SALE
const getSaleProducts = async () => {
  try {
    const res = await axios.get("http://localhost:5001/api/products?sale=true");
    return res.data;
  } catch (err) {}
};

//Send notification
try {
  axios.put(
    "http://localhost:5001/api/users/saleNotification/" + product_id, //Current products' ID here
    undefined, //Take current products' before_sale_cost here
    {
      headers: { token: "Bearer " + currUser.accessToken },
    }
  );
} catch (err) {
  alert(err);
}
