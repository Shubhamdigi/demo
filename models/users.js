"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
   
    static associate(models) {
      // define association here
      this.belongsTo(models.Groups, {
        foreignKey: "group_id",
        as: "groups",
      });
    }
  }
  Users.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      group_id: DataTypes.INTEGER,
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      login_token: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "users",
      modelName: "Users",
      timestamps: false,
    }
  );
  return Users;
};
