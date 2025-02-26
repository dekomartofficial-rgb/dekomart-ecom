const dataAcces = require('../database/dataaccess')
const mssql = require('mssql')
const jwt = require('jsonwebtoken');
const { handleReps } = require('./common.controller')


class User {
    static ValidateUser = async (req, res) => {
        let pool = null;
        try {
            pool = await dataAcces.connect();
            const request = pool.request();

            request.input('as_app_user_id', mssql.VarChar(100), req.body.AppUserId)
            request.input('as_pwd', mssql.NVarChar, req.body.Password)
            request.input('as_auth_type', mssql.VarChar(10), req.body.AuthType)
            request.output('p_user_id', mssql.BigInt)
            request.output('p_msg', mssql.VarChar(mssql.MAX))
            request.output('p_rettype', mssql.TinyInt)

            const result = await request.execute('PKG_EXT$validate_login')
            const output = await handleReps(result.output);
            /**
             * JWT Token Generate
             */
            if (output.UserId > 0) {
                const secret = process.env.SECRET_TOKERN;
                const token = jwt.sign({ UserId: output.UserId }, secret, { expiresIn: process.env.TOKEN_EXPIRE })
                res.json({ ...output, Token: token });
                return
            }

            res.status(200).json(output);
        }
        catch (e) {
            res.status(500).json({ err : 'Error Occur'});
        }
    }
    
}

module.exports = User; 