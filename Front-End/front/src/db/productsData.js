import axios from "axios";

export async function fetchProducts() {
  try {
    const data = await axios.get(`${process.env.REACT_APP_PATH}products/read`);
    if (data) {
      console.log(data);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProductById(productId) {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_PATH}products/delete`,
      {
        data: { id: productId },
      },
      {}
    );
    if (response.status === 200) {
      return response.status;
    }
  } catch (error) {
    console.log(error);
    return error.message;
  }
}
export async function addProduct(productData) {
  console.log(productData.categoryName);
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_PATH}products/add`,
      {
        prodName: productData.prodName,
        prodPrice: productData.prodPrice,
        prodDescription: productData.prodDescription,
        prodImage: productData.prodImage,
        categoryName: productData.categoryName,
      }
    );
    if (response.status === 200) {
      return response.status;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateProduct(prodId, data) {
  console.log(data);
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_PATH}products/update`,
      {
        prodName: data.prodName,
        prodPrice: data.prodPrice,
        prodDescription: data.prodDescription,
        prodImage: data.prodImage,
        categoryName: data.categoryName,
        id: prodId,
      }
    );
    if (response.status === 200) {
      console.log(response.data);
      return response.status;
    }
  } catch (error) {
    console.log(error);
  }
}
