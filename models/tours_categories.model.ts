import { DataType, DataTypes } from "sequelize";
import dotenv from "dotenv";
import sequelize from "../config/database";
import Category from "./category.model";
import slugify from "slugify";
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

Category.beforeCreate((category) =>{
    category["slug"] = slugify(`${category["title"]}-${Date.now()}`,{
        lower : true,
        strict: true
    })
})

export default Tours_Categories;