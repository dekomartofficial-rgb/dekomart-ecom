const dataAcces = require('../database/dataaccess')
const mssql = require('mssql')
const { handleReps } = require('./common.controller')

class Admin {
    static GetScreenList = async (req, res) => {
        let pool = null;
        try {
            pool = await dataAcces.connect();
            const request = pool.request();

            const result = await request.execute('PKG_AD$p_get_screen_list') 

            res.status(200).json( { screenList : result.recordsets[0], groupName : result.recordsets[1] });
        }
        catch (e) {
            res.status(500).json({ err: 'Error Occur' });
        }
    }
}

module.exports = Admin