const express = require('express');
const cors = require("cors");
const { gms_controller } = require('./controllers/get');
const { pis_controller } = require('./controllers/pis');


// Create an express app instance
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create a router instance
const route = express.Router();

// Define the route for /gms
route.get('/gms', gms_controller.getGMSDetails);
route.get('/data', gms_controller.gmsFullDetails);

// Define the route for /PIS
route.get('/pis',pis_controller.getPISDetails);
route.post('/pis',pis_controller.postMobUpdate);
// Use the router middleware in the app
app.use(route);
// app.use(cors());

// Set the port
const port = 3000;

// Start the server and listen for requests
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log("User: ", process.env.OR_DB_USER);
});


// const route = require('express').Router();

// const { Router } = require('express');
// const { gms_controller } = require('../controllers/get');


// const port= 3000;



// route.get('/gms',gms_controller.getGMSDetails
// );


// route.listen(port,()=>{

//     console.log('Server running at ', port);
// });


// // module.exports = route;

