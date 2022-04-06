const express = require("express");
const bcrypt = require("bcryptjs");
const nodemailer = require('nodemailer');
const crypto = require("crypto");
const Sequelize = require("sequelize");
const fileUpload = require('express-fileupload');
const Op = Sequelize.Op;
const fs = require('fs');

// userRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /users.
const userRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../connect_db");
var Binary = require('mongodb').Binary;
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
const { request } = require("express");


userRoutes.route("/users").get(function (req, res) {
    let db_connect = dbo.getDb("overbooked");
     db_connect
      .collection("users")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        console.log(res.json(result));
      }); 
  });
  

  // app.get("/api/books", (req, res) => {
  //   console.log("bb");
  //   let db_connect = dbo.getDb("overbooked");
  //   // db_connect
  //   //   .collection("books")
  //   //   .find({})
  //   //   .toArray(function (err, result) {
  //   //     if (err) throw err;
  //   //     console.log(res.json(result));
  //   //   });
  // });


  module.exports = userRoutes;