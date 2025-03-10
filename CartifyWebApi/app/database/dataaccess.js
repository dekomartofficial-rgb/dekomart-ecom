const mssql = require("mssql");
require("dotenv").config();
let pool;

getConfig = () => {
  const env = process.env.NODE_ENV;
  return {
    user: env === 'DEV' ? process.env.SQL_USER_NAME : process.env.SQL_USER_NAME_CLD,
    password: env === 'DEV' ? process.env.SQL_PASSWORD : process.env.SQL_PASSWORD_CLD,
    server: env === 'DEV' ? process.env.SQL_SERVER : process.env.SQL_SERVER_CLD,
    database: env === 'DEV' ? process.env.DATABASE_NAME : process.env.DATABASE_NAME_CLD,
    options: {
      trustServerCertificate: true,
      enableArithAbort: true
    },
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    }
  };
};

const fetchParams = entity => {
  const params = [];
  for (const key in entity) {
    if (entity.hasOwnProperty(key)) {
      const value = entity[key];
      params.push({
        name: key,
        value
      });
    }
  }
  return params;
};

const assignParams = (request, inputs, outputs) => {
  [inputs, outputs].forEach((params, index) => {
    const operation = index === 0 ? 'input' : 'output';
    params.forEach(param => {
      if (param.type) {
        request[operation](param.name, param.type, param.value);
      } else {
        request[operation](param.name, param.value);
      }
    });
  });
};

const run = async (name, command, inputs = [], outputs = []) => {
  await connect();
  const request = pool.request();
  assignParams(request, inputs, outputs);
  return request[name](command);
};

const connect = async () => {
  if (!pool) {
    pool = new mssql.ConnectionPool(getConfig());
  }
  if (!pool.connected) {
    await pool.connect();
  }
};

const query = async (command, inputs = [], outputs = []) => {
  return run('query', command, inputs, outputs);
};

const queryEntity = async (command, entity, outputs = []) => {
  const inputs = fetchParams(entity);
  return run('query', command, inputs, outputs);
};

const execute = async (command, inputs = [], outputs = []) => {
  return run('execute', command, inputs, outputs);
};

const executeEntity = async (command, entity, outputs = []) => {
  const inputs = fetchParams(entity);
  return run('execute', command, inputs, outputs);
};

const generateTable = (columns, entities) => {
  const table = new mssql.Table();

  columns.forEach(column => {
    if (column && typeof column === 'object' && column.name && column.type) {
      if (column.hasOwnProperty('options')) {
        table.columns.add(column.name, column.type, column.options);
      } else {
        table.columns.add(column.name, column.type);
      }
    }
  });

  entities.forEach(entity => {
    table.rows.add(...columns.map(i => entity[i.name]));
  });

  return table;
};

module.exports = {
  pool,
  mssql,
  connect,
  query,
  queryEntity,
  execute,
  executeEntity,
  generateTable,
  getConfig
};





// constructor() {
//   this.env = process.env.NODE_ENV;
//   this.config = this.getConfig();
//   this.poolPromise = new mssql.ConnectionPool(this.config)
//     .connect()
//     .then(pool => {
//       console.log(`Connected to database: ${this.env === 'DEV' ? process.env.DATABASE_NAME : process.env.DATABASE_NAME_CLD} (Environment: ${this.env})`);
//       return pool;
//     })
//     .catch(err => console.error('Database Connection Error:', err.message));
// }

// getConfig() {
//   const env = process.env.NODE_ENV;
//   return {
//     user: env === 'DEV' ? process.env.SQL_USER_NAME : process.env.SQL_USER_NAME_CLD,
//     password: env === 'DEV' ? process.env.SQL_PASSWORD : process.env.SQL_PASSWORD_CLD,
//     server: env === 'DEV' ? process.env.SQL_SERVER : process.env.SQL_SERVER_CLD,
//     database: env === 'DEV' ? process.env.DATABASE_NAME : process.env.DATABASE_NAME_CLD,
//     options: {
//       trustServerCertificate: true,
//       enableArithAbort: true
//     },
//     pool: {
//       max: 10,
//       min: 0,
//       idleTimeoutMillis: 30000
//     }
//   };
// }

// async connect() {
//   return this.poolPromise;
// }


// async disconnect() {
//   try {
//     if (this.pool) {
//       await this.pool.close();
//       this.pool = null;
//       console.log("Database connection closed.");
//     }
//   } catch (error) {
//     console.error("Error closing connection:", error.message);
//     throw error;
//   }
// }

// async tryDatabase() {
//   try {
//     const config = this.getConfig();
//     const tempPool = await new mssql.ConnectionPool(config).connect();
//     console.log(`Database Connected: ${this.database} (Environment: ${this.env})`);
//     await tempPool.close();
//   } catch (error) {
//     console.error("Database Connection Error:", error.message);
//     throw error;
//   }
// }
// }