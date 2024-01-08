import { useState } from "react";
import styles from "./Signup.module.css";
import { NavLink } from "react-router-dom";
import { fetchSignUp } from "../../db/authData";
import toast from "react-hot-toast";
function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  });
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (Object.values(formData).some((item) => item === "" || item === null)) {
      toast.error("All fields are required");
    } else {
      try {
        toast.success("loadingg..");
        let log = await fetchSignUp(formData);
        if (log.token) toast.success("Helloo!!");
        else toast.error("can't signup");
      } catch (error) {
        console.error("Error log in:", error);
        toast.error("can't signup");
      }
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.container1}>
        <h1 className={styles.heading}>Sign Up</h1>
      </div>
      <div className={styles.container2}>
        <form method="post">
          <div className={styles["form-group"]}>
            <div className={styles["inline-input-group"]}>
              <div className={styles["label-input-group"]}>
                <input
                  className={styles.formInputs}
                  type="text"
                  id="First_Name"
                  name="firstName"
                  placeholder="Enter your FirstName"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className={styles["form-group"]}>
            <div className={styles["inline-input-group"]}>
              <div className={styles["label-input-group"]}>
                <input
                  className={styles.formInputs}
                  type="text"
                  id="Last_Name"
                  name="lastName"
                  placeholder="Enter your LastName"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className={styles["form-group"]}>
            <div className={styles["inline-input-group"]}>
              <div className={styles["label-input-group"]}>
                <input
                  className={styles.formInputs}
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className={styles["form-group"]}>
            <div className={styles["inline-input-group"]}>
              <div className={styles["label-input-group"]}>
                <input
                  className={styles.formInputs}
                  type="text"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className={styles["form-group"]}>
            <div className={styles["inline-input-group"]}>
              <div className={styles["label-input-group"]}>
                <input
                  className={styles.formInputs}
                  type="text"
                  id="verifyPassword"
                  name="verifyPassword"
                  placeholder="Enter your password again"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className={styles["form-group"]}>
            <div className={styles["label-input-group"]}>
              <button
                type="submit"
                className={styles.btn}
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
            <div className={styles.ref}>
              <p>Already have an account?</p>
              <NavLink to="/login" className={styles.log}>
                Log In
              </NavLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
