import Product from "../models/product.model.js";
import Category from "../models/category.model.js";
export const createProd = async (req, res) => {
  const { title, price, categoryName, description, supplier } = req.body;

  if (!categoryName) {
    return res
      .status(404)
      .send(`Category ${categoryName} is empty or not found!`);
  }

  try {
    const category = await Category.findOne({
      where: {
        name: categoryName,
      },
    });

    if (!category) {
      return res.status(404).send(`Category ${categoryName} is not found!`);
    }

    const newProd = await Product.create({
      title,
      price: parseInt(price),
      supplier,
      CategoryId: category.id,
      description,
    });

    res.status(201).json({ data: newProd });
  } catch (error) {
    console.log("Error in saving data: ", error);
    res.status(500).send("Internal Server Error!");
  }
};

export const getAllProds = async (req, res) => {
  try {
    const prods = await Product.findAll({
      include: { model: Category },
    });
    res.status(200).send(prods);
  } catch (error) {
    console.log("Error in displaying data: ", error);
    res.status(500).send("Internal Server Error!");
  }
};

export const removeProd = async (req, res) => {
  const { id } = req.body;

  try {
    const deleteProd = await Product.destroy({ where: { id: id } });
    if (deleteProd)
      res.status(200).send(`Product ${id} is removed successfully!`);
    else res.status(404).send(`Product ${id} is not found!`);
  } catch (error) {
    console.log("Error in removing data: ", error);
    res.status(500).send("Internal Server Error!");
  }
};

export const editProd = async (req, res) => {
  const { title, price, categoryName, description, supplier } = req.body;
  const prodId = req.body.id;

  if (!title || !price || !supplier || !categoryName || !description)
    return res.status(400).send("All fields are required!");

  try {
    const category = await Category.findOne({
      where: { name: categoryName },
    });
    if (!category)
      return res.status(404).send(`Category ${categoryName} is not found!`);

    const updateProd = await Product.update(
      {
        title,
        price: parseInt(price),
        supplier,
        CategoryId: category.id,
        description,
      },
      { where: { id: parseInt(prodId) } }
    );

    if (!updateProd) res.status(404).send(`Product ${prodId} is not found!`);
    else res.status(200).send(`Product ${prodId} is edited successfully!`);
  } catch (error) {
    console.log("Error in editing data: ", error);
    res.status(500).send("Internal Server Error!");
  }
};
