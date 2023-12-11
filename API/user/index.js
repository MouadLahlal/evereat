const express = require("express");
const api = express();
const auth = require("./routes/auth-route");
const restaurant = require('./routes/restaurant-route');
const order = require('./routes/order-route');
const authentication = require("../middlewares/authentication");

api.use(express.json());

api.use('/auth', auth);
api.use('/restaurant', restaurant);
api.use('/order', order);

module.exports = api;