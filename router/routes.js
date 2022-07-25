"use strict";

const express = require("express");
const router = express.Router();
const userManagementController = require("../controllers/userManagement");
const jwt_authentication = require("../apps/jwt_auth");

router.get("/home", (req, res) => {
  res.send("hello");
});
router.get("/", (req, res) => {
  res.send("This is a demo node app");
});

router.post("/login", userManagementController.Login);
router.get(
  "/get-players",
  jwt_authentication,
  userManagementController.getPlayers
);
router.get("/get-maps", jwt_authentication, userManagementController.getMaps);
// router.post("/create-maps", jwt_authentication, userManagementController.createMaps);

module.exports = router;
