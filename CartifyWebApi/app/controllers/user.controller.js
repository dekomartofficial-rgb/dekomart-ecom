const dataAcces = require("../database/dataaccess");
const mssql = require("mssql");
const jwt = require("jsonwebtoken");
const { handleReps } = require("./common.controller");

class User {
  static ValidateUser = async (req, res) => {
    try {
      const request = await dataAcces.getRequest();
      request.input("as_email_id", mssql.NVarChar(100), req.body.EmailId);
      request.input("as_password", mssql.NVarChar(100), req.body.Password);
      request.input("as_auth_type", mssql.VarChar(1), req.body.AuthType);
      request.output("p_user_role", mssql.VarChar(10));
      request.output("p_user_id", mssql.BigInt);
      request.output("p_retmsg", mssql.VarChar(500));
      request.output("p_rettype", mssql.Int);

      const result = await request.execute("PKG_USER$p_validate_login");
      const output = await handleReps(result.output);

      if (output.UserId > 0) {
        const secret = process.env.SECRET_TOKERN;
        const token = jwt.sign({ UserId: output.UserId, RoleCode: output.UserRole }, secret, { expiresIn: process.env.TOKEN_EXPIRE, });
        res.json({ ...output, Token: token });
        return;
      }
      res.status(200).json(output);
    } catch (e) {
      res.status(500).json({ err: "Error Occur" + e });
    }
  };
  static GetUserRoleScreens = async (req, res) => {
    try {
      const request = await dataAcces.getRequest();
      request.input("ai_user_id", mssql.BigInt, req.LoggedUserId);
      const result = await request.execute("PKG_USER_ACCES$p_get_user_role_screen");

      res.status(200).json(result.recordsets[0]);
    } catch (e) {
      res.status(500).json({ err: "Error Occur" + e });
    }
  }
  static SaveUser = async (req, res) => {
    try {
      const request = await dataAcces.getRequest();

      request.input("ai_user_id", mssql.BigInt, req.body.UserId);
      request.input("as_first_name", mssql.VarChar(100), req.body.FirstName);
      request.input("as_second_name", mssql.VarChar(100), req.body.SecondName);
      request.input("ad_dob", mssql.DateTime, req.body.DateOfBirth);
      request.input("as_password", mssql.NVarChar(100), req.body.Password);
      request.input("as_email", mssql.NVarChar(100), req.body.Email);
      request.input("ai_phone_number", mssql.BigInt, req.body.PhoneNumber);
      request.input("as_profile_image", mssql.NVarChar(mssql.MAX), req.body.ProfileImage);
      request.input("as_user_status", mssql.VarChar(1), req.body.UserStatus);
      request.input("as_ops_mode", mssql.VarChar(10), req.body.OpsMode);
      request.input("as_user_role", mssql.VarChar(10), req.body.UserRole);
      request.input("ai_phone_verified", mssql.TinyInt, req.body.IsPhoneVerified);
      request.input("ai_mail_verified", mssql.TinyInt, req.body.IsMailVerified);
      request.input("ai_logged_user_id", mssql.BigInt, req.LoggedUserId);
      request.output("p_retmsg", mssql.VarChar(500));
      request.output("p_rettype", mssql.Int);

      const result = await request.execute("PKG_USER$p_save_user");
      const output = await handleReps(result.output);

      res.status(200).json(output);
    } catch (e) {
      res.status(500).json({ err: "Error Occur" + e });
    }
  };
  static GetScreenList = async (req, res) => {
    try {
      const request = await dataAcces.getRequest();

      request.input("ai_user_id", mssql.BigInt, req.query.UserId);
      request.input("as_role_code", mssql.VarChar(5), req.query.RoleCode);
      const result = await request.execute("PKG_USER_ACCESS$p_get_role_screen");

      const screenList = result.recordsets[0].map((s) => {
        return { GroupName: s.GroupName, GroupIcon: s.GroupIcon, IsHaveChild: s.IsHaveChild, Children: result.recordsets[1].filter((c) => c.GroupName === s.GroupName), };
      });
      res.status(200).json({ screenList });
    } catch (e) {
      res.status(500).json({ err: "Error Occur :" + e });
    }
  };
  static GetUserHome = async (req, res) => {
    try {

      const request = await dataAcces.getRequest();
      request.input("ai_user_id", mssql.BigInt, req.query.UserId ?? 0);
      const result = await request.execute("PKG_HOME$p_get_user_home");

      res.status(200).json(result.recordsets);
    } catch (e) {
      res.status(500).json({ err: "Error Occur :" + e });

    }
  }
  static GetUserProfile = async (req, res) => {
    try {
      const request = await dataAcces.getRequest();

      request.input("ai_user_id", mssql.BigInt, req.query.UserId);
      const result = await request.execute("PKG_USER$p_get_user_profile");

      res.status(200).json(result.recordsets[0]);
    } catch (e) {
      res.status(500).json({ err: "Error Occur:" + e });
    }
  };
  static GetUser = async (req, res) => {
    try {
      const request = await dataAcces.getRequest();

      request.input("ai_user_id", mssql.BigInt, req.query.UserId);

      let result = await request.execute("PKG_USER$p_get_users");
      result = result.recordsets.length > 1 ? result.recordsets[0] : result.recordsets[0]?.length === 1 ? result.recordsets[0][0]
        : result.recordsets[0];

      res.status(200).json(result);
    } catch (e) {
      res.status(500).json({ err: "Error Occur:" + e });
    }
  };
  static GetUserRole = async (req, res) => {
    try {
      const request = await dataAcces.getRequest();

      request.input("ai_user_id", mssql.BigInt, req.query.UserId);

      const result = await request.execute("PKG_USER$p_get_user_role");

      res.status(200).json(result.recordsets[0]);
    } catch (e) {
      res.status(500).json({ err: "Error Occur:" + e });
    }
  };

  static GetSysParm = async (req, res) => {
    try {
      const request = await dataAcces.getRequest();

      request.input("as_parm_code", mssql.VarChar(20), req.query.ParmCode);

      const result = await request.execute("PKG_USER$p_get_sys_parm");
      res.status(200).json(result.recordsets[0]);
    } catch (e) {
      res.status(500).json({ err: "Error Occur:" + e });
    }

  };
  static SaveNewCustomer = async (req, res) => {
    try {
      const request = await dataAcces.getRequest();
      request.input("ai_user_id", mssql.BigInt, req.body.UserId);
      request.input("as_first_name", mssql.VarChar(100), req.body.FirstName);
      request.input("as_second_name", mssql.VarChar(100), req.body.SecondName);
      request.input("ad_dob", mssql.Date, req.body.Dob);
      request.input("as_password", mssql.NVarChar(100), req.body.Password);
      request.input("as_email", mssql.NVarChar(100), req.body.Email);
      request.input("ai_phone_number", mssql.BigInt, req.body.PhoneNumber);
      request.input("as_profile_image", mssql.NVarChar(mssql.MAX), req.body.ProfileImage);
      request.input("as_ops_mode", mssql.VarChar(10), req.body.OpsMode);
      request.input("ai_logged_user_id", mssql.BigInt, req.LoggedUserId);
      request.output("p_retmsg", mssql.VarChar(500));
      request.output("p_rettype", mssql.Int);

      const result = await request.execute("PKG_CUSTOMER$save_new_customer");
      const output = await handleReps(result.output);

      res.status(200).json(output);
    } catch (e) {
      res.status(500).json({ err: "Error Occur" + e });
    }
  };
  static ResetPassword = async (req, res) => {
    try {
      const request = await dataAcces.getRequest();
      request.input("as_ops_mode", mssql.VarChar(20), req.body.OpsMode);
      request.input("ai_user", mssql.BigInt, req.LoggedUserId);
      request.input("as_current_password", mssql.NVarChar(100), req.body.CurrentPassword);
      request.input("as_new_password", mssql.NVarChar(100), req.body.NewPassword);
      request.output("p_retmsg", mssql.VarChar(mssql.NVarChar));
      request.output("p_rettype", mssql.TinyInt);

      const result = await request.execute("PKG_CUSTOMER$reset_password");
      const output = await handleReps(result.output);
      res.status(200).json(output);
    } catch (e) {
      res.status(500).json({ err: "Error Occur" + e });
    }
  }
  static GetProductDetails = async (req, res) => {
    try {
      const request = await dataAcces.getRequest();
      request.input("ai_user_id", mssql.BigInt, req.LoggedUserId);
      request.input("ai_product_id", mssql.BigInt, req.query.ProductId);
      const result = await request.execute("PKG_CUSTOMER$p_get_product_details");

      res.status(200).json(result.recordsets);
    } catch (e) {
      res.status(500).json({ err: "Error Occur" + e });
    }
  }
  static SaveAddToCart = async (req, res) => {
    try {
      const request = await dataAcces.getRequest();
      request.input("ai_cart_id", mssql.BigInt, req.body.CartId);
      request.input("ai_product_id", mssql.BigInt, req.body.ProductId);
      request.input("ai_user_id", mssql.BigInt, req.LoggedUserId);
      request.input("as_size", mssql.VarChar(200), req.body.Size);
      request.input("ai_quantity", mssql.TinyInt, req.body.Quantity);
      request.input("as_status", mssql.VarChar(200), req.body.Status);
      request.input("ai_logged_user_id", mssql.BigInt, req.LoggedUserId);
      request.input("as_ops_mode", mssql.VarChar(30), req.body.OpsMode); // 'ADD' | 'UPDATE' | 'DELETE' 
      request.output("p_rettype", mssql.TinyInt);
      request.output("p_retmsg", mssql.VarChar(mssql.MAX)); // Or specify max length like mssql.VarChar(1000)

      const result = await request.execute("PKG_PROD$p_save_cart_item");
      const output = await handleReps(result.output);
      res.status(200).json(output);
    } catch (e) {
      res.status(500).json({ err: "Error Occur" + e });
    }
  }
  static GetUserCart = async (req, res) => {
    try {
      const request = await dataAcces.getRequest();
      request.input("ai_user_id", mssql.BigInt, req.LoggedUserId);

      const result = await request.execute("PKG_CUSTOMER$p_get_user_cart");
      
      res.status(200).json(result.recordsets);

    } catch (e) {
      res.status(500).json({ err: "Error Occur" + e });
    }
  }
}

module.exports = User;
