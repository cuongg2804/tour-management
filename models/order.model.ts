import { DataType, DataTypes } from "sequelize";
import dotenv from "dotenv";
import sequelize from "../config/database";
dotenv.config();

const Order = sequelize.define("Order", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    code: {
        type : DataTypes.STRING(10)
    },
    fullName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    phone: {
        type : DataTypes.STRING(10),
        allowNull : false
    },
    note: {
        type: DataTypes.STRING(500)
    },
    status: {
        type: DataTypes.STRING(20),
    },
    deleted: {
        type : DataTypes.BOOLEAN,
        defaultValue : false
    },
    deletedAt: {
      type: DataTypes.DATE,
    }
}, {
    tableName:"orders",
    timestamps : true
})

export default Order;