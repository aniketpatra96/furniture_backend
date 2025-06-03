const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const dbConnect = require("./db/dbConnect");
const ProductsRouter = require("./routes/products.routes");
const UserRouter = require("./routes/user.routes");
const cors = require("cors");
const ProfileRouter = require("./routes/profile.routes");
const OrderRouter = require("./routes/orders.routes");
const {
  LoginUser,
  RegisterUser,
  updateUser,
} = require("./controllers/user.controller");
const {
  getProfile,
  addProfile,
  updateProfile,
  deleteProfile,
} = require("./controllers/profile.controller");
const {
  createOrder,
  getAllOrdersByUserId,
} = require("./controllers/orders.controller");
const {
  addAllProducts,
  getAllProducts,
  createProduct,
  getProduct,
  searchProduct,
} = require("./controllers/products.controller");
const authenticateUser = require("./middlewares/auth.middleware");

app.get("/", (req, res) => res.send("Furniture World!"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/login", (req, res) => {
  LoginUser(req, res);
});

app.post("/register", (req, res) => {
  RegisterUser(req, res);
});

app.put("/user/:id", (req, res) => {
  updateUser(req, res);
});

app.get("/profile/:id", authenticateUser, (req, res) => {
  getProfile(req, res);
});

app.post("/profile/:id", authenticateUser, (req, res) => {
  addProfile(req, res);
});

app.put("/profile/:id", authenticateUser, (req, res) => {
  updateProfile(req, res);
});

app.delete("/profile/:id", authenticateUser, (req, res) => {
  deleteProfile(req, res);
});

app.get("/orders/:id", authenticateUser, (req, res) => {
  getAllOrdersByUserId(req, res);
});

app.post("/orders", authenticateUser, (req, res) => {
  createOrder(req, res);
  s;
});

app.post("/api/products/addall", authenticateUser, (req, res) => {
  addAllProducts(req, res);
});
app.post("/api/products", authenticateUser, (req, res) => {
  createProduct(req, res);
});
app.get("/api/products/:id", authenticateUser, (req, res) => {
  getProduct(req, res);
});
app.get("/api/products", authenticateUser, (req, res) => {
  getAllProducts(req, res);
});
app.get("/api/products/search/:key", authenticateUser, (req, res) => {
  searchProduct(req, res);
});

dbConnect();
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}!`));
