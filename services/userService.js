"use strict";

const Users = require("../models/index").Users;
const Maps = require("../models/index").Maps;
const Groups = require("../models/index").Groups;
const { Jwt } = require("../apps/jwt");

class Userservice {
  static async getUserByEmail(email) {
    try {
      const user = await Users.findOne({
        where: { email: email },
        include: [{ model: Groups, as: "groups" }],
      });
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  static async getPlayers() {
    try {
      const user_data = await Users.findAll({
        where: { group_id: 2 },
      });
      return user_data;
    } catch (e) {
      console.log(e);
    }
  }
  static async getMaps() {
    try {
      const map_data = await Maps.findAll({});
      return map_data;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Userservice;
