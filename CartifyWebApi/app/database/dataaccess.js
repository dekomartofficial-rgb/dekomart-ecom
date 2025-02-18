const mssql = require('mssql')

let pool;

const config = () => ({
    user: process.env.SQL_USER_NAME,
    password: process.env.SQL_PASSWORD,
    server: process.env.SQL_SERVER,
    database: process.env.DATABASE_NAME,
    options: {
        trustServerCertificate: true
    }
});

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
            console.error('Database Connection Error:', error);
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
            console.error('Error closing connection:', error);
            throw error;
        }
    }
}

module.exports = new DataAccess();