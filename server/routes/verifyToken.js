const jwt = require("jsonwebtoken");



/*
We have three different roles namely:

  //Customer
  //Product Manager
  //Sales Manager

In this sense, verifications which are needed to execute operations must be made in accordance to
                                    permissions provided to each user
*/


//Basic user login verification - applicable for all user roles
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

//Verifies that request for the operation is done by an individual user for her features or a manager
const verifyTokenAndUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) 
    {
      next();
    } else {
      res.status(403).json("You are not alowed to do that! - You are not the specified user");
    }
  });
};



//Verifies that request for the operation is done by an individual user for her features or a manager
const verifyTokenOrManager = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || (req.user.user_role == "product-manager") || (req.user.user_role == "sales-manager") ) 
    {
      next();
    } else {
      res.status(403).json("You are not alowed to do that! - You are not authorized");
    }
  });
};

//Verifies that request for the operation is done by a manager
const verifyTokenAndManager = (req, res, next) => {
  verifyToken(req, res, () => {
    if ((req.user.user_role == "product-manager") || (req.user.user_role == "sales-manager") ) 
    {
      next();
    } else {
      res.status(403).json("You are not alowed to do that! - You are not a manager");
    }
  });
};

//Verifies that request for the operation is done by a product manager
const verifyTokenAndProductManager = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.user_role == "product-manager") {
      next();
    } else {
      res.status(403).json("You are not alowed to do that! - You are not a product manager");
    }
  });
};

//Verifies that request for the operation is done by a sales manager
const verifyTokenAndSalesManager = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.user_role == "sales-manager") {
      next();
    } else {
      res.status(403).json("You are not alowed to do that! - You are not a sales manager");
    }
  });
};


module.exports = {
  verifyToken,
  verifyTokenAndUser,
  verifyTokenOrManager,
  verifyTokenAndManager,
  verifyTokenAndProductManager,
  verifyTokenAndSalesManager
};
