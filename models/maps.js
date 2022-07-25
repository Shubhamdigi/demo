"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Maps extends Model {}
  Maps.init(
    {
      map_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      map_name: {
        type: DataTypes.STRING,
        isAlpha: true,
        notEmpty: true,
      },
    },
    {
      sequelize,
      tableName: "maps",
      modelName: "Maps",
      timestamps: false,
    }
  );
  return Maps;
};
