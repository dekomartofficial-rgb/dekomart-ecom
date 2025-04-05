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

    static SaveProduct = async (req, res) => {
        try {
          const request = await dataAcces.getRequest();
      
          request.input("as_product_name", mssql.NVarChar(255), req.body.ProductName);
          request.input("ai_company_id", mssql.Int, req.body.CompanyId);
          request.input("as_description", mssql.NVarChar(mssql.MAX), req.body.Description);
          request.input("as_category_code", mssql.NVarChar(50), req.body.CategoryCode);
          request.input("as_brand", mssql.NVarChar(50), req.body.BrandCode);
          request.input("as_about", mssql.NVarChar(mssql.MAX), req.body.About);
          request.input("ai_logged_user_id", mssql.BigInt, req.LoggedUserId);
      
          request.output("p_retmsg", mssql.VarChar(500));
          request.output("p_rettype", mssql.Int);
      
          const result = await request.execute("PKG_PRODUCT$p_save_product_header");
          const output = await handleReps(result.output);
      
          res.status(200).json(output);
        } catch (e) {
          res.status(500).json({ err: "Error Occurred: " + e.message });
        }
      };

      static UpdateProduct = async (req, res) => {
        try {
          const request = await dataAcces.getRequest();
      
          request.input("ai_product_id", mssql.BigInt, req.body.ProductId);
          request.input("as_product_name", mssql.NVarChar(255), req.body.ProductName);
          request.input("ai_company_id", mssql.Int, req.body.CompanyId);
          request.input("as_description", mssql.NVarChar(mssql.MAX), req.body.Description);
          request.input("as_category_code", mssql.NVarChar(50), req.body.CategoryCode);
          request.input("as_brand", mssql.NVarChar(50), req.body.BrandCode);
          request.input("as_about", mssql.NVarChar(mssql.MAX), req.body.About);
          request.input("ai_logged_user_id", mssql.BigInt, req.LoggedUserId);
      
          request.output("p_retmsg", mssql.VarChar(500));
          request.output("p_rettype", mssql.Int);
      
          const result = await request.execute("PKG_PRODUCT$p_save_product_header");
          const output = await handleReps(result.output);
      
          res.status(200).json(output);
        } catch (e) {
          res.status(500).json({ err: "Error Occurred: " + e.message });
        }
      };

      static DeleteProduct = async (req, res) => {
        try {
          const request = await dataAcces.getRequest();
      
          request.input("ai_product_id", mssql.BigInt, req.body.ProductId);
          request.output("p_retmsg", mssql.VarChar(500));
          request.output("p_rettype", mssql.Int);
      
          const result = await request.execute("PKG_PRODUCT$p_save_product_header");
          const output = await handleReps(result.output);
      
          res.status(200).json(output);
        } catch (e) {
          res.status(500).json({ err: "Error Occurred: " + e.message });
        }
      };
      
}

module.exports = Admin