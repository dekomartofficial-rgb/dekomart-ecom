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
    static GetRoleScreenAccess = async (req, res) => {
        try { 
            const request = await dataAcces.getRequest()
            request.input("as_role_code", mssql.VarChar(3), req.query.RoleCode);

            const result = await request.execute("PKG_USER_ACCESS$p_get_role_screen_access");

            res.status(200).json(result.recordsets[0])
        } catch (e) {
            res.status(500).json({ err: "Error Occur" + e })
        }
    }
    static SaveRoleRight = async (req, res) =>{
        try { 
            const request = await dataAcces.getRequest()
            const tableType = new mssql.Table();
            tableType.columns.add('ROLE_CODE',mssql.VarChar(3))
            tableType.columns.add('SCREEN_CODE', mssql.VarChar(10))
            tableType.columns.add('IS_HAVE_ACCESS', mssql.TinyInt)
            
            const RoleTable = req.body.RoleRight;
            RoleTable.forEach(RoleTable => {
                tableType.rows.add(
                    RoleTable.ROLE_CODE,
                    RoleTable.SCREEN_CODE,
                    RoleTable.IS_HAVE_ACCESS
                )
            });


            //add parameter and table type to procedure
            request.input('tt_role_right', tableType);              
            request.input('ai_user_id', mssql.BigInt, req.LoggedUserId);
            request.output("p_retmsg", mssql.VarChar(500));
            request.output("p_rettype", mssql.Int); 
            const result = await request.execute("PKG_USER_ACCESS$p_save_role_right")
            const output = await handleReps(result.output);
            
            res.status(200).json(output)
        } catch (e) {
            res.status(500).json({ err: "Error Occur" + e })
        }
    }
}

module.exports = Admin