import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";
import Users from "../models/user.model.js";

export async function addNewUser(req, res) {
  let user = req.body;
  user.role = req.body.role || "user";

  try {
    if (
      !user.firstName ||
      !user.lastName ||
      !user.email ||
      !user.password ||
      !req.body.verifyPassword
    ) {
      return res.status(400).json({ error: "missing required property" });
    } else {
      let passExpression = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      let emailExpression = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!user.password.match(passExpression)) {
        return res.status(400).json({
          error:
            "password should start with letter and has 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter",
        });
      }
      if (!user.email.match(emailExpression)) {
        return res.status(400).json({
          error: "Invalid email. it should be like test12@gmail.com",
        });
      }
      if (user.password !== req.body.verifyPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
      } else {
        let findUser = await Users.findOne({
          where: { email: user.email },
        });
        if (findUser) {
          return res.status(400).json({ error: "email is already exist" });
        }
        try {
          const hashedPass = await bcrypt.hash(user.password, 10);
          const newUser = await Users.create({
            ...user,
            password: hashedPass,
            role: user.role,
          });
          const token = jwt.sign(
            { role: newUser.role, userId: newUser.id },
            process.env.TOKEN,
            { expiresIn: "24h" }
          );
          return res.status(200).json({ newUser, token });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: "Error creating user" });
        }
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}

export async function signIn(req, res) {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).send("All inputs are required");
    }
    const user = await Users.findOne({
      where: { email: email },
    });
    if (!user) {
      res.status(404).json({ message: "User Not Found!" });
    } else {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (user && isValidPassword) {
        const token = jwt.sign(
          { role: user.role, userId: user.id },
          process.env.TOKEN,
          { expiresIn: "24h" }
        );
        res.status(200).json({ token });
      } else {
        res.status(403).json({ message: "Wrong credentials" });
      }
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getOneUser(req, res) {
  try {
    const data = await Users.findOne({
      where: { id: req.user.userId },
    });
    console.log(data);
    if (!data) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ user: data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
