import { DataTypes } from "sequelize";
import dotenv from "dotenv";
import sequelize from "../config/database";
import { permission } from "process";

const Roles = sequelize.define("roles", {
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull : false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT('long'),
        allowNull : true
    },
    permissions :{
        type : DataTypes.TEXT('long'),
        allowNull : false
    },
    deleted: {
        type : DataTypes.BOOLEAN,
        defaultValue: false
    },
    deletedAt: {
        type: DataTypes.DATE,
      }
  }, {
      tableName:"roles",
      timestamps : true
  })

export default Roles;