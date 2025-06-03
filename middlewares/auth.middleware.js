const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Unauthorized User" });
  }
  let jwttoken = token.split(" ")[1];
  try {
    let decodedData = jwt.verify(jwttoken, process.env.JWT_SECRET);
    console.log(decodedData.user);
    req.user = decodedData.user;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

module.exports = authenticateUser;
