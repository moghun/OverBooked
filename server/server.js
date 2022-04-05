
const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())
const dotenv = require("dotenv")


dotenv.config()

const port = process.env.PORT || 5000
const dbo = require("./connect_db");


if (process.env.NODE_ENV === 'production') {
    // Exprees will serve up production assets
    app.use(express.static('../client/build'));
  
    // Express serve up index.html file if it doesn't recognize route
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '..','client', 'build', 'index.html'));
    });
  }
   
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});