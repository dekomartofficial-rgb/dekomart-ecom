const dataAcces = require('../database/dataaccess')
const mssql = require('mssql')
const { handleReps } = require('./common.controller')

class Admin {
    static GetRole = async (req, res) => {
        try {
            const req = await dataAcces.getRequest()
            const result = await req.execute("PKG_DDL$p_get_role")

            res.status(200).json(result.recordsets[0])
        } catch (e) {
            res.status(500).json({ err: "Error Occur" + e });

        }
    }
}

module.exports = Admin