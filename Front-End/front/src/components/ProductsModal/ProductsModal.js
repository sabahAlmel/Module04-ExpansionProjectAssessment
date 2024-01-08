import { useState } from "react";
import style from "./ProductsModal.module.css";
import { addProduct } from "../../db/productsData";
import { toast } from "react-hot-toast";

export const ProductsModal = (props) => {
  const { setIsModalOpen } = props;
  const [dataToSend, setDataToSend] = useState({
    title: "",
    price: "",
    description: "",
    supplier: "",
    categoryName: "",
  });
  function updateObject(name, value) {
    setDataToSend({ ...dataToSend, [name]: value });
  }
  function handleInputChange(e) {
    updateObject(e.target.name, e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (
      Object.values(dataToSend).some((item) => item === "" || item === null)
    ) {
      toast.error("All fields are required");
    } else {
      dataToSend.price = parseInt(dataToSend.price);
      try {
        addProduct(dataToSend);
        setIsModalOpen(false);
        toast.success("A New Product has been added");
        props.fetchData();
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <section className={style.modalForm}>
      <form onSubmit={handleSubmit}>
        <h3>Add Product</h3>
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
          <button
            type="submit"
            className={style.submitBtn}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </section>
      </form>
    </section>
  );
};
