import { useState, useEffect } from "react";
import style from "./ProductsModal.module.css";
import { addProduct, updateProduct } from "../../db/productsData";
import { toast } from "react-hot-toast";

export const ProductsUpdateModal = (props) => {
  const { setIsModalOpen, initialData, fetchData } = props;
  const [dataToSend, setDataToSend] = useState({
    title: initialData.title,
    price: initialData.price,
    description: initialData.description,
    supplier: initialData.supplier,
    categoryName: initialData.categoryName,
  });

  useEffect(() => {
    setDataToSend({
      title: initialData.title,
      price: initialData.price,
      description: initialData.description,
      supplier: initialData.supplier,
      categoryName: initialData.categoryName,
    });
  }, [initialData]);

  function updateObject(name, value) {
    setDataToSend({ ...dataToSend, [name]: value });
  }

  function handleInputChange(e) {
    updateObject(e.target.name, e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      Object.values(dataToSend).some((item) => item === "" || item === null)
    ) {
      toast.error("All fields are required");
    } else {
      dataToSend.price = parseInt(dataToSend.price);
      try {
        if (initialData.id) {
          toast("Loading...");
          await updateProduct(initialData.id, dataToSend);
          toast.success("Product Updated Successfully");
        } else {
          await addProduct(dataToSend);
          toast.success("A New Product has been added");
        }

        setIsModalOpen(false);
        fetchData();
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <section className={style.modalForm}>
      <form onSubmit={handleSubmit}>
        <h3>{initialData.id ? "Update Product" : "Add Product"}</h3>
        <section className={style.inputContainer}>
          <input
            className={style.input}
            name="title"
            type="text"
            value={dataToSend.title}
            onChange={handleInputChange}
            placeholder="Product Name"
          />
        </section>
        <section className={style.inputContainer}>
          <input
            className={style.input}
            name="price"
            type="number"
            value={dataToSend.price}
            onChange={handleInputChange}
            placeholder="Price"
          />
        </section>
        <section className={style.inputContainer}>
          <input
            className={style.input}
            name="categoryName"
            type="text"
            value={dataToSend.categoryName}
            onChange={handleInputChange}
            placeholder="Category Name"
          />
        </section>
        <section className={style.inputImageContainer}>
          <input
            type="text"
            name="supplier"
            className={style.input}
            value={dataToSend.supplier}
            onChange={handleInputChange}
            placeholder="supplier"
          />
        </section>

        <section className={style.inputContainer}>
          <textarea
            className={style.textarea}
            name="description"
            type="text"
            placeholder="Description"
            width="200"
            height="500px"
            value={dataToSend.description}
            onChange={handleInputChange}
          />
        </section>

        <section className={style.btnContainer}>
          <button
            type="button"
            className={style.cancelBtn}
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button type="submit" className={style.submitBtn}>
            Submit
          </button>
        </section>
      </form>
    </section>
  );
};
