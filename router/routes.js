"use strict";

const express = require("express");
const router = express.Router();
const userManagementController = require("../controllers/userManagement");

router.get("/home", (req, res) => {
  res.send("hello");
});
router.get("/", (req, res) => {
  res.send("This is a demo node app");
});

router.post("/login", userManagementController.Login);

module.exports = router;
