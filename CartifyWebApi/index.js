const express = require("express");
const dotenv = require("dotenv");
const app = express();
const logger = require("morgan");
const PORT = process.env.PORT || 3000;
var cors = require("cors");
const errorHandler = require("./app/helper/error-handler");
const DataAccess = require("./app/database/dataaccess");
const {convertBigIntMiddleware} = require("./app/middleware/CommonMiddleware");

app.use(cors());
app.use(express.json()); // deal with json data
app.use(express.urlencoded({ extended: true }));
dotenv.config();
app.use(logger("dev"));
app.use(errorHandler);
app.use(convertBigIntMiddleware); 

const customJsonParser = express.json({
  reviver: (key, value) => {
    // If value is a string, keep it as string (no conversion to number)
    return typeof value === 'string' ? value : value;
  }
});

app.use(customJsonParser); // Custom JSON parser to handle BigInt

/**
 * @author Mohammed Sinan
 * @commect Used to route's
 */

const userRoutes = require("./app/routers/user.router");
const adminRoutes = require("./app/routers/admin.router");

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

app.get('/', (req, res) => {
  res.send('API is running...connected to database');
  
});


app.listen(PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
  DataAccess.getPool()
    .then(console.log(`Database Connected Successfully -  ${process.env.NODE_ENV}`))
    .catch((e) => console.log("Error : Database Connection Failed"));
});
