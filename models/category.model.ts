import { DataTypes } from "sequelize";
import sequelize from "../config/database";
const Category = sequelize.define("Category", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull : false,
        primaryKey : true
    },
    description : {
        type : DataTypes.TEXT('long'),
        allowNull: true
    },
    image: {
        type : DataTypes.STRING(500)
    },
    status: {
        type : DataTypes.STRING(20)
    },
    position: {
        type : DataTypes.INTEGER
    },
    slug: {
        type: DataTypes.STRING(500)
    },
      deleted: {
        type : DataTypes.BOOLEAN,
        defaultValue : false
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
},
{
    tableName: 'categories',
    timestamps: true
}
);

export default Category ;