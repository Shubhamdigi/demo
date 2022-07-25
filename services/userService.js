"use strict";

const Users = require("../models/index").Users;

class Userservice {
  static async login(email, pass) {
    const userData = await Users.findOne({
      where: {
        email: email,
      },
    });

    if (userData) {
      if (pass == userData.password) {
        return "success";
      } else {
        return "doesnt match";
      }
    } else {
      return "notFound";
    }
  }
}

module.exports = Userservice;
