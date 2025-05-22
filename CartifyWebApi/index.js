const express = require("express");
const dotenv = require("dotenv");
const logger = require("morgan");
const app = express();
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000;
const errorHandler = require("./app/helper/error-handler");
const DataAccess = require("./app/database/dataaccess");
const { convertBigIntMiddleware } = require("./app/middleware/CommonMiddleware");
var cors = require("cors");
dotenv.config();

app.use(cors());
app.use(express.json()); // deal with json data
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(errorHandler);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(convertBigIntMiddleware);
const customJsonParser = express.json({ reviver: (key, value) => { return typeof value === 'string' ? value : value; } });
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
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
  DataAccess.getPool()
    .then(console.log(`Database Connected Successfully -  ${process.env.NODE_ENV}`))
    .catch((e) => console.log("Error : Database Connection Failed"));
});
