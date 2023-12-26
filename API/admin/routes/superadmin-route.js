const express = require("express");
const route = express.Router();
const { newAdmin, updateAdmin, getAll } = require("../controllers/superadmin-controller");

route.get("/", getAll);
route.post("/", newAdmin);
route.put("/:id_admin", updateAdmin);

module.exports = route;