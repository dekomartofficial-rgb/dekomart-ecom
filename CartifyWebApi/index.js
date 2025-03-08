const express = require("express");
const dotenv = require("dotenv");
const app = express();
const logger = require("morgan");
const PORT = process.env.PORT || 3000;
var cors = require("cors");
const errorHandler = require("./app/helper/error-handler");

app.use(cors());
app.use(express.json()); // deal with json data
app.use(express.urlencoded({ extended: true }));
dotenv.config();
app.use(logger("dev"));
app.use(errorHandler);

/**
 * @author Mohammed Sinan
 * @commect Used to route's
 */

const userRoutes = require("./app/routers/user.router");
const adminRoutes = require("./app/routers/admin.router"); 

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

app.listen(PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
