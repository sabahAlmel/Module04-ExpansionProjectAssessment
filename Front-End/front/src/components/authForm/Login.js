import { useContext, useState } from "react";
import styles from "./Login.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { fetchLogin, fetchUser } from "../../db/authData";
import toast from "react-hot-toast";
import axios from "axios";
import { UserContext } from "../../userContext/userContext";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  function handleChange(e) {
    setformData({ ...formData, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (Object.values(formData).some((item) => item === "" || item === null)) {
      toast.error("All fields are required");
    } else {
      try {
        toast.success("loadingg..");
        let log = await fetchLogin(formData);
        if (log.token) {
          toast.success("Helloo!!");
          setUser(await fetchUser());
          return navigate("/", { replace: true });
        } else toast.error("can't login");
      } catch (error) {
        console.error("Error log in:", error);
        toast.error("can't login");
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.container1}>
        <h1 className={styles.heading}>Log In</h1>
      </div>
      <div className={styles.container2}>
        <form method="post">
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
              <p>Don't have an account?</p>
              <NavLink to="/signup" className={styles.log}>
                Sign Up
              </NavLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
