const mssql = require("mssql");
require("dotenv").config();

class DataAccess {
  constructor() {
    this.env = process.env.NODE_ENV;
    this.pool = null;

    if (this.env === 'DEV') {
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
      }, pool: {
        max: 10, // Set max number of connections
        min: 0,
        idleTimeoutMillis: 30000,
      },
    };
  }

  async connect() {
    try {
      if (!this.pool) {
        const config = this.getConfig();
        this.pool = await new mssql.ConnectionPool(config).connect();
        console.log(`Connected to database: ${this.database} (Environment: ${this.env})`);
      }
      return this.pool;
    } catch (error) {
      console.error("Database Connection Error:", error.message);
      throw error;
    }
  }

  async disconnect() {
    try {
      if (this.pool) {
        await this.pool.close();
        this.pool = null;
        console.log("Database connection closed.");
      }
    } catch (error) {
      console.error("Error closing connection:", error.message);
      throw error;
    }
  }

  async tryDatabase() {
    try {
      const config = this.getConfig();
      const tempPool = await new mssql.ConnectionPool(config).connect();
      console.log(`Database Connected: ${this.database} (Environment: ${this.env})`);
      await tempPool.close();
    } catch (error) {
      console.error("Database Connection Error:", error.message);
      throw error;
    }
  }
}

process.on('SIGINT', async () => {
  try {
    console.log('Closing SQL Server connection pool...');
    const pool = await poolPromise;
    await pool.close();
    console.log('Pool closed successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Error closing pool:', err);
    process.exit(1);
  }
});

// Create and export an instance of DataAccess
module.exports = new DataAccess();