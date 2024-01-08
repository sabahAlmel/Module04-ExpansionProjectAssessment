import Category from "../models/category.model.js";
export async function addCategory(req, res) {
  const { name } = req.body;
  try {
    const newCategory = await Category.create({ name });
    res.json({ message: "Added New Category", data: newCategory });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
