import jwt from "jsonwebtoken";

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(403).send("Forbidden");
    } else {
      const decoded = jwt.verify(token, process.env.TOKEN);
      req.user = decoded;
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

export { authenticate };
