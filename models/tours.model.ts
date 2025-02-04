import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import dotenv from "dotenv";
dotenv.config();
import { title } from "process";
import { scheduler } from "timers/promises";
import { deflate } from "zlib";


const Tour = sequelize.define("Tour",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull : false,
        primaryKey : true
    },
    title : {
        type : DataTypes.STRING(255),
        allowNull: true
    },
    code : {
        type :DataTypes.STRING(10)
    },
    images: {
        type : DataTypes.TEXT('long')
    },
    price: {
        type : DataTypes.TEXT('long')
    },
    discount: {
        type : DataTypes.INTEGER
    },
    information: {
        type: DataTypes.INTEGER
    },
    schedule: {
        type: DataTypes.TEXT('long')
    },
    timeStart: {
        type: DataTypes.DATE,
      },
      stock: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.STRING(20),
      },
      position: {
        type: DataTypes.INTEGER,
      },
      slug: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      deleted: {
        type : DataTypes.BOOLEAN,
        defaultValue : false
      },
      deleteAt: {
        type: DataTypes.DATE,
      },
},
{
    tableName: 'tours',
    timestamps: true
}
);

export default Tour;