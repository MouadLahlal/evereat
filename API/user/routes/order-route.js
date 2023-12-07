const express = require("express");
const {
	placeOrder,
	editOrder,
} = require("../controllers/order-controller");
const route = express.Router();

route.post("/", placeOrder);
route.put("/:id_order", editOrder);

module.exports = route;
