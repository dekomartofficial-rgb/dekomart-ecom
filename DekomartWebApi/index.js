const express = require("express");
const dotenv = require("dotenv");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 80;
const errorHandler = require("./app/helper/error-handler");
const DataAccess = require("./app/database/dataaccess");
const { convertBigIntMiddleware } = require("./app/middleware/CommonMiddleware");

// Middleware
app.use(cors());
app.use(express.json({
  reviver: (key, value) => {
    if (typeof value === 'string' && /^\d{15,}$/.test(value)) {
      try {
        return BigInt(value);
      } catch (e) {
        return value;
      }
    }
    return value;
  }
}));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(convertBigIntMiddleware);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static('app'));

// Routes
const userRoutes = require("./app/routers/user.router");
const adminRoutes = require("./app/routers/admin.router");

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);//a

// Root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handler must be last
app.use(errorHandler);

// Start server and connect DB
app.listen(PORT, async () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  try {
    await connectWithRetry(5, 3000);
    console.log(`✅ Database connected successfully (${process.env.NODE_ENV})`);
  } catch (e) {
    console.error("❌ Database Connection Failed:", e.message);
  }
});

// Retry Logic for DB Connection
async function connectWithRetry(retries, delay) {
  for (let i = 0; i < retries; i++) {
    try {
      await DataAccess.getPool();
      return;
    } catch (err) {
      console.error(`⚠️ Retry ${i + 1}/${retries}: DB connection failed. Retrying in ${delay}ms...`);
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  throw new Error("DB connection failed after retries");
};
