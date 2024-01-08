import express, { urlencoded } from "express";
import dotenv from "dotenv";
import sequelize from "./config.js";
import cors from "cors";
import "./association.js";
import { userRouter } from "./routes/user.route.js";
import { signIn } from "./controllers/user.controller.js";
import productRouter from "./routes/product.route.js";
import categoriesRouter from "./routes/category.route.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200,
  })
);
app.use(urlencoded({ extended: true }));
app.use("/users", userRouter);
app.post("/signin", signIn);
app.use("/products", productRouter);
app.use("/categories", categoriesRouter);
try {
  await sequelize.authenticate();
  console.log("Connection established");
} catch (error) {
  console.log("Unable to connect to database");
}

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
