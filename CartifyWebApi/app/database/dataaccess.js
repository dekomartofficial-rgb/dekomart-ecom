const mssql = require("mssql");

let pool;
let DevType = process.env.NODE_ENV;
let DatbaseName;

const config = () => {
  if (DevType === "DEV") {
    return {
      user: process.env.SQL_USER_NAME,
      password: process.env.SQL_PASSWORD,
      server: process.env.SQL_SERVER,
      database: process.env.DATABASE_NAME,
      options: {
        trustServerCertificate: true,
      },
    };
  } else {
    return {
      user: process.env.SQL_USER_NAME_CLD,
      password: process.env.SQL_PASSWORD_CLD,
      server: process.env.SQL_SERVER_CLD,
      database: process.env.DATABASE_NAME_CLD,
      options: {
        trustServerCertificate: true,
      },
    };
  }
};

const DatabaseName = () => {
  if ((DevType = "DEV")) {
    return process.env.DATABASE_NAME;
  } else {
    return process.env.DATABASE_NAME_CLD;
  }
};

const TryDatabase = async () => {
  try {
    if (!pool) {
      this.pool = await new mssql.ConnectionPool(config()).connect;
      console.log(
        `Database Connected Successfully, Enviroment Type : ${DevType}, Database Name: ${DatabaseName()}`
      );
      if (pool) {
        await pool.close();
        this.pool = null;
      }
    }
  } catch (error) {
    console.error("Database Connection Error:", error);
    throw error;
  }
};

class DataAccess {
  constructor() {
    this.pool = null;
  }

  async connect() {
    try {
      if (!this.pool) {
        this.pool = await new mssql.ConnectionPool(config()).connect();
      }
      return this.pool;
    } catch (error) {
      console.error("Database Connection Error:", error);
      throw error;
    }
  }

  async disconnect() {
    try {
      if (this.pool) {
        await this.pool.close();
        this.pool = null;
      }
    } catch (error) {
      console.error("Error closing connection:", error);
      throw error;
    }
  }
  async TryDatabase(){
    TryDatabase()
  }
}

module.exports = new DataAccess();
