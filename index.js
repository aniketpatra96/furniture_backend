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
app.use("/user", UserRouter);
app.use("/profile", ProfileRouter);
app.use("/api/products", ProductsRouter);
app.use("/orders", OrderRouter);
dbConnect();
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}!`));
