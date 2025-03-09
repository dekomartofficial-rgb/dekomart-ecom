const dataAcces = require('../database/dataaccess')
const mssql = require('mssql')
const jwt = require('jsonwebtoken');
const { handleReps } = require('./common.controller')


class User {
    static ValidateUser = async (req, res) => {
        try {
            let pool = null;
            pool = await dataAcces.connect();
            const request = pool.request();

            request.input('as_email_id', mssql.NVarChar(100), req.body.EmailId)
            request.input('as_password', mssql.NVarChar(100), req.body.Password)
            request.input('as_auth_type', mssql.VarChar(1), req.body.AuthType)
            request.output('p_user_id', mssql.BigInt)
            request.output('p_retmsg', mssql.VarChar(500))
            request.output('p_rettype', mssql.Int)

            const result = await request.execute('PKG_USER$p_validate_login')
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
            res.status(500).json({ err: 'Error Occur' + e });
        }
    }
    static SaveUser = async (req, res) => {

        try {
            let pool = null;
            pool = await dataAcces.connect();
            const request = pool.request();

            request.input('ai_user_id', mssql.BigInt, req.body.UserId)
            request.input('as_first_name', mssql.VarChar(100), req.body.FirstName)
            request.input('as_second_name', mssql.VarChar(100), req.body.SecondName)
            request.input('ad_dob', mssql.DateTime, req.body.DateOfBirth)
            request.input('as_password', mssql.NVarChar(100), req.body.Password)
            request.input('as_email', mssql.NVarChar(100), req.body.Email)
            request.input('ai_phone_number', mssql.NVarChar(1000), req.body.Email)
            request.input('as_email', mssql.BigInt, req.body.Email)
            request.input('as_profile_image', mssql.VarChar(), req.body.Email)
            request.output('p_user_id', mssql.BigInt)
            request.output('p_retmsg', mssql.VarChar(500))
            request.output('p_rettype', mssql.Int)

            const result = await request.execute('PKG_USER$p_validate_login')
            const output = await handleReps(result.output);

            res.status(200).json(output);
        } catch (e) {
            res.status(500).json({ err: 'Error Occur' + e });
        }
    }
    static GetScreenList = async (req, res) => {
        try {
            let pool = null;
            pool = await dataAcces.connect();
            const request = pool.request();

            request.input('ai_user_id', mssql.BigInt, req.query.UserId)
            const result = await request.execute('PKG_USER_ACCESS$p_get_role_screen')

            const screenList = result.recordsets[0].map((s) => {
                return {
                    GroupName: s.GroupName,
                    GroupIcon: s.GroupIcon,
                    IsHaveChild: s.IsHaveChild,
                    Children: result.recordsets[1].filter((c) => c.GroupName === s.GroupName)
                }
            })


            res.status(200).json({ screenList });
        }
        catch (e) {
            res.status(500).json({ err: 'Error Occur :' + e });
        }
    }
    static GetUserProfile = async (req, res) => {
        try {
            let pool = null;
            pool = await dataAcces.connect()
            const request = pool.request()

            request.input('ai_user_id', mssql.BigInt, req.query.UserId)
            const result = await request.execute('PKG_USER$p_get_user_profile')

            res.status(200).json(result.recordsets[0])
        } catch (e) {
            res.status(500).json({ err: 'Error Occur:' + e })
        }
    }
}

module.exports = User; 