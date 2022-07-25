"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Groups extends Model {
    static associate(models) {
      this.hasMany(models.Users, {
        foreignKey: "group_id",
        as: "users",
      });
    }
  }
  Groups.init(
    {
      group_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      group_name: {
        type: DataTypes.STRING,
        isAlpha: true,
        notEmpty: true,
      },
    },
    {
      sequelize,
      tableName: "groups",
      modelName: "Groups",
      timestamps: false,
    }
  );
  return Groups;
};
