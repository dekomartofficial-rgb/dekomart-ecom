const dataAcces = require('../database/dataaccess')
const mssql = require('mssql')
const { handleReps } = require('./common.controller')

class Admin {
    static GetScreenList = async (req, res) => {
        let pool = null;
        try {
            pool = await dataAcces.connect();
            const request = pool.request(); 
            console.log(req.query)
            request.input('ai_user_id', mssql.BigInt, req.query.UserId)
            const result = await request.execute('PKG_USER_ACCESS$p_get_role_screen')

            res.status(200).json({ groupName: result.recordsets[0], screenList: result.recordsets[1] });
        }
        catch (e) {
            res.status(500).json({ err: 'Error Occur :' + e });

        }
    }
}

module.exports = Admin