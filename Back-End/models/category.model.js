import { DataTypes } from "sequelize";
import sequelize from "../config.js";
const Category = sequelize.define("Category", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
Category.sync({ alter: true });
export default Category;
