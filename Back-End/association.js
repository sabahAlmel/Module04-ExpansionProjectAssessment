import sequelize from "./config.js";
import Category from "./models/category.model.js";
import Product from "./models/product.model.js";

Category.hasMany(Product, { as: "products", onDelete: "CASCADE" });
Product.belongsTo(Category, {
  onDelete: "CASCADE",
});

await sequelize.sync({ alter: true });
