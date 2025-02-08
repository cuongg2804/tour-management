import { DataType, DataTypes } from "sequelize";
import dotenv from "dotenv";
import sequelize from "../config/database";
dotenv.config();

const Tours_Categories = sequelize.define("Tours_Categories", {
    tour_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'tours',
            key: 'id'
        }
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'categories',
            key: 'id'
        }
    }
}, {
    tableName:"tours_categories",
    timestamps : false
})

export default Tours_Categories;