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
      this.port = parseInt(process.env.SQL_PORT || "1433");
    } else {
      this.user = process.env.SQL_USER_NAME_CLD;
      this.password = process.env.SQL_PASSWORD_CLD;
      this.server = process.env.SQL_SERVER_CLD;
      this.database = process.env.DATABASE_NAME_CLD;
      this.port = parseInt(process.env.SQL_PORT_CLD || "1433");
    }
  }

  getConfig() {
    return {
      user: this.user,
      password: this.password,
      server: this.server,
      port: this.port,
      database: this.database,
      requestTimeout: 30000,
      cancelTimeout: 10000,
      options: {
        encrypt: this.env === "DEV" ? false : true,
        enableArithAbort: true,
        useUTC: true,
        parseBigIntAsNumber: true,
        trustServerCertificate: true,
      },
      pool: {
        max: 10,
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
          console.error("❗ Database pool error:", err);
          this.poolPromise = null;
        });
      }
      return this.poolPromise;
    } catch (error) {
      console.error("❌ Database Connection Error:", error.message);
      this.poolPromise = null;
      throw error;
    }
  }

  async getPool() {
    return this.connect();
  }

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
