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
const os = require("os");
const { 
  LoginUser,
  RegisterUser,
  updateUser 
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
app.get("/", (req, res) => res.send("Furniture World!"));
app.get("/ip", (req, res) => {
  function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
      for (const iface of interfaces[name]) {
        // Skip over internal (i.e., 127.0.0.1) and non-IPv4 addresses
        if (iface.family === "IPv4" && !iface.internal) {
          return iface.address;
        }
      }
    }
    return "127.0.0.1";
  }
  res.json({ ip: getLocalIP() });
});
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

app.get("/profile/:id", (req, res) => {
  getProfile(req, res);
});

app.post("/profile/:id", (req, res) => {
  addProfile(req, res);
});

app.put("/profile/:id", (req, res) => {
  updateProfile(req, res);
});

app.delete("/profile/:id", (req, res) => {
  deleteProfile(req, res);
});

app.get("/orders/:id", (req, res) => {
  getAllOrdersByUserId(req, res);
  s;
});

app.post("/orders", (req, res) => {
  createOrder(req, res);
  s;
});

app.post("/api/products/addall", (req, res) => {
  addAllProducts(req, res);
});
app.post("/api/products", (req, res) => {
  createProduct(req, res);
});
app.get("/api/products/:id", (req, res) => {
  getProduct(req, res);
});
app.get("/api/products", (req, res) => {
  getAllProducts(req, res);
});
app.get("/api/products/search/:key", (req, res) => {
  searchProduct(req, res);
});

dbConnect();
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}!`));
