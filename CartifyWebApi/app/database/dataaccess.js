const mssql = require("mssql");
require("dotenv").config();

class DataAccess {
  constructor() {
    this.env = process.env.NODE_ENV;
    this.poolPromise = null;

    if (this.env === "DEV") {
      this.user = process.env.SQL_USER_NAME;
      this.password = process.env.SQL_PASSWORD;
      this.server = process.env.SQL_SERVER;
      this.database = process.env.DATABASE_NAME;
    } else {
      this.user = process.env.SQL_USER_NAME_CLD;
      this.password = process.env.SQL_PASSWORD_CLD;
      this.server = process.env.SQL_SERVER_CLD;
      this.database = process.env.DATABASE_NAME_CLD;
    }
  }

  getConfig() {
    return {
      user: this.user,
      password: this.password,
      server: this.server,
      database: this.database,
      options: {
        trustServerCertificate: true,
      },
      pool: {
        max: 10, // Set max number of connections
        min: 0,
        idleTimeoutMillis: 30000,
      },
    };
  }

  async connect() {
    try {
      if (!this.poolPromise) {
        const config = this.getConfig();
        this.poolPromise = new mssql.ConnectionPool(config).connect();
        const pool = await this.poolPromise;

        pool.on("error", (err) => {
          console.error("Database pool error:", err);
          this.poolPromise = null; // Reset pool on error
        });
      }
      return this.poolPromise;
    } catch (error) {
      console.error("Database Connection Error:", error.message);
      this.poolPromise = null; // Reset pool on error
      throw error;
    }
  }

  // Get singleton pool instance
  async getPool() {
    return this.connect();
  }

  // Get a new request object from the pool
  async getRequest() {
    const pool = await this.getPool();
    return pool.request();
  }

  async disconnect() {
    try {
      if (this.poolPromise) {
        const pool = await this.poolPromise;
        await pool.close();
        this.poolPromise = null;
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new DataAccess();
