const dataAcces = require('../database/dataaccess')
const { handleReps } = require('./common.controller')
const MainController = require('./main.controller')
const mssql = require('mssql')

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
    static GetSystemParm = async (req, res) => {
        try {
            const request = await dataAcces.getRequest()
            request.input("as_parm_code", mssql.VarChar(20), req.query.ParmCode);
            const result = await request.execute("PKG_SETTINGS$p_get_sys_parm");
            res.status(200).json(result.recordsets[0])
        } catch (e) {
            res.status(500).json({ err: "Error Occur" + e })
        }
    }
    static GetAllGroupName = async (req, res) => {
        try {
            const request = await dataAcces.getRequest()

            const result = await request.execute("PKG_DDL$p_get_ref_group");

            res.status(200).json(result.recordsets[0])
        } catch (e) {
            res.status(500).json({ err: "Error Occur" + e })
        }
    }
    static GetRefData = async (req, res) => {
        try {
            const request = await dataAcces.getRequest()
            request.input('as_group_name', mssql.VarChar(50), req.query.GroupName)
            const result = await request.execute("PKG_DDL$p_get_ref_data");
            res.status(200).json(result.recordsets[0])

        } catch (e) {
            res.status(500).json({ err: "Error Occur" + e })
        }
    }
    static GetRefGroupData = async (req, res) => {
        try {
            console.log(req.query.GroupName)
            const request = await dataAcces.getRequest()
            request.input('as_group_name', mssql.VarChar(mssql.MAX), req.query.GroupName)
            const result = await request.execute("PKG_DDL$get_ref_group_data");
            res.status(200).json(result.recordsets[0])

        } catch (e) {
            res.status(500).json({ err: "Error Occur" + e })
        }
    }
    static GetDocument = async (req, res) => {
        try {
            const request = await dataAcces.getRequest()
            request.input('ai_key_id', mssql.BigInt, req.query.KeyId)
            request.input('as_key_id', mssql.VarChar(10), req.query.KeyType)
            request.input('ai_user_id', mssql.BigInt, req.LoggedUserId)
            const result = await request.execute("PKG_BASE$p_get_document");
            res.status(200).json(result.recordsets[0])

        } catch (e) {
            res.status(500).json({ err: "Error Occur" + e })
        }
    }
    static SaveRoleRight = async (req, res) => {
        try {
            const request = await dataAcces.getRequest()
            const tableType = new mssql.Table();
            tableType.columns.add('ROLE_CODE', mssql.VarChar(3))
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
    static SaveRefData = async (req, res) => {
        try {
            const request = await dataAcces.getRequest();

            console.log(req.body)

            request.input('as_group_name', mssql.VarChar(50), req.body.GroupName);
            request.input('as_code', mssql.VarChar(20), req.body.Code);
            request.input('as_code_active', mssql.TinyInt, req.body.CodeActive);
            request.input('as_description', mssql.NVarChar(510), req.body.Description);
            request.input('as_disp_order', mssql.Int, req.body.DispOrder);
            request.input('as_colour', mssql.VarChar(7), req.body.Colour);
            request.input('as_ops_mode', mssql.VarChar(10), req.body.OpsMode);
            request.input('ai_user_id', mssql.BigInt, req.LoggedUserId);
            request.output("p_retmsg", mssql.VarChar(500));
            request.output("p_rettype", mssql.Int);

            const result = await request.execute("PKG_SETTINGS$p_save_ref_data")
            const output = await handleReps(result.output);

            res.status(200).json(output)
        } catch (error) {
            res.status(500).json({ err: "Error Occur" + error })
        }
    }
    static SaveProductHeader = async (req, res) => {
        try {
            const request = await dataAcces.getRequest();
            const VariantTableType = new mssql.Table('TT_PRODUCT_VARIENT'); // match SQL Server type
            const ProdctDetails = JSON.parse(req.body.ProductDetails || '{}');
            const ProductVarient = JSON.parse(req.body.ProductVariants || '[]');

            VariantTableType.columns.add('VARIENT_ID', mssql.BigInt);
            VariantTableType.columns.add('COLOR', mssql.VarChar(10));
            VariantTableType.columns.add('SIZE', mssql.VarChar(20));
            VariantTableType.columns.add('PRICE', mssql.BigInt);
            VariantTableType.columns.add('STOCK_COUNT', mssql.BigInt);

            if (ProductVarient.length > 0) {
                ProductVarient.forEach(variant => {
                    VariantTableType.rows.add(
                        variant.VariantId,
                        variant.Colour,
                        variant.Size,
                        variant.Price,
                        variant.Stock
                    );
                });
            } 
            //add parameter and table type to procedure
            request.input('ai_product_id', mssql.BigInt, ProdctDetails.ProductID);
            request.input('ai_company_id', mssql.BigInt, 1);
            request.input('as_product_name', mssql.VarChar(150), ProdctDetails.ProductName);
            request.input('as_product_desc', mssql.VarChar(mssql.MAX), ProdctDetails.ProductDesc);
            request.input('as_product_size', mssql.VarChar(200), ProdctDetails.ProductSize);
            request.input('as_genders', mssql.VarChar(200), ProdctDetails.Gender);
            request.input('an_base_price', mssql.BigInt, ProdctDetails.BasePricing);
            request.input('an_total_stock', mssql.BigInt, ProdctDetails.Stock);
            request.input('an_discount', mssql.BigInt, ProdctDetails.Discount);
            request.input('as_discount_type', mssql.VarChar(200), ProdctDetails.DiscountType);
            request.input('as_category', mssql.VarChar(200), ProdctDetails.Catogery);
            request.input('tt_product_varient', VariantTableType);
            request.input('as_ops_mode', mssql.VarChar(15), ProdctDetails.OpsMode);
            request.input('ai_user_id', mssql.BigInt, req.LoggedUserId);
            request.output("p_retmsg", mssql.VarChar(500));
            request.output("p_rettype", mssql.TinyInt);
            request.output("p_retid", mssql.Int);

            const result = await request.execute("PKG_PROD$p_save_product_header")
            const output = await handleReps(result.output);
            const fileUploadRtn = await MainController.saveAttachment(req.files, result.output.p_retid, 'product', req.LoggedUserId)
            if (fileUploadRtn === false) return;
            res.status(200).json(output)
        } catch (error) {
            res.status(500).json({ err: "Error Occur" + error })

        }
    }
    static GetAllProductsdashboard = async (req, res) => {
        try {
            const request = await dataAcces.getRequest()
            request.input('ai_user_id', mssql.BigInt, req.LoggedUserId)
            request.input('as_search_keyword', mssql.VarChar(200), req.query.SearchKeyword)
            const result = await request.execute("PKG_PROD$p_get_all_product_and_dashboard")

            res.status(200).json(result.recordsets)
        } catch (e) {
            res.status(500).json({ err: "Error Occur" + e })
        }
    }
    static GetProductAndVariant = async (req, res) => {
        try {
            const request = await dataAcces.getRequest()
            request.input('ai_product_id', mssql.BigInt, req.query.ProductId)
            request.input('ai_user_id', mssql.BigInt, req.LoggedUserId)
            const result = await request.execute("PKG_PROD$p_get_product_and_variant")

            res.status(200).json(result.recordsets)
        } catch (e) {
            res.status(500).json({ err: "Error Occur" + e })
        }
    }
}

module.exports = Admin