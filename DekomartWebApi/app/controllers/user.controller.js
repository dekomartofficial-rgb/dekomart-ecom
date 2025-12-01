const dataAcces = require("../database/dataaccess");
const mssql = require("mssql");
const jwt = require("jsonwebtoken");
const { handleReps } = require("./common.controller");
const Mail = require('./mail.controller')
const fsp = require('fs/promises');
const MainController = require('./main.controller')
const path = require("path");


class User {
  static ValidateUser = async (req, res) => {
    try {
      const s_user_mode = req.body.AuthType
      const request = await dataAcces.getRequest();
      request.input("as_email_id", mssql.NVarChar(100), req.body.EmailId);
      request.input("as_password", mssql.NVarChar(100), req.body.Password);
      request.input("as_auth_type", mssql.VarChar(20), req.body.AuthType);
      request.output("p_user_role", mssql.VarChar(10));
      request.output("p_user_id", mssql.BigInt);
      request.output("p_retmsg", mssql.VarChar(500));
      request.output("p_rettype", mssql.Int);
      request.output("p_email_template", mssql.BigInt);

      const result = await request.execute("PKG_USER$p_validate_login");
      let output = await handleReps(result.output);

      if (s_user_mode === 'GOOGLE_AUTH' || s_user_mode === 'NORMAL_LOGIN') {
        if (output.UserId > 0) {
          const secret = process.env.SECRET_TOKERN;
          const token = jwt.sign({ UserId: output.UserId, RoleCode: output.UserRole }, secret, { expiresIn: process.env.TOKEN_EXPIRE, });
          res.json({ ...output, Token: token });
          return;
        }
      } else { 
        if (output.MessageType  === 2 && output.EmailId) {
          const EmailId = Number(result.output.p_email_template)
          const mail_res = await Mail.GetEmailTemplate(0, EmailId, '', '', '', output.UserId)
          if (mail_res === 'SUCCESS') {
            res.status(200).json(output)
          }
        } 
      }
    } catch (e) {
      res.status(500).json({ err: "Error Occur" + e });
      console.log(e)
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
  static GetSectionDetails = async (req, res) => {
    try {

      const request = await dataAcces.getRequest();
      console.log(req.query)
      request.input("ai_user_id", mssql.BigInt, req.query.UserId ?? 0);
      request.input("as_section_code", mssql.VarChar(20), req.query.Section)
      const result = await request.execute("PKG_HOME$p_get_user_section_details");

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
  static SaveUserAddress = async (req, res) => {
    try {
      const request = await dataAcces.getRequest();
      request.input("ai_address_id", mssql.BigInt, req.body.AddressId || 0);
      request.input("ai_user_id", mssql.BigInt, req.LoggedUserId);
      request.input("as_full_name", mssql.NVarChar(200), req.body.FullName);
      request.input("as_city", mssql.NVarChar(300), req.body.CityTown);
      request.input("as_state", mssql.NVarChar(300), req.body.State);
      request.input("ai_pincode", mssql.BigInt, req.body.Pincode);
      request.input("ai_mobile_number", mssql.BigInt, req.body.MobileNumber);
      request.input("as_flat_house_build_company", mssql.VarChar(250), req.body.FlatHouseBuildCompany);
      request.input("as_country", mssql.VarChar(150), req.body.Country);
      request.input("as_area_strt_village", mssql.VarChar(250), req.body.AreaStrtVillage);
      request.input("as_land_mark", mssql.VarChar(250), req.body.LandMark);
      request.input("ai_is_permanent", mssql.TinyInt, req.body.IsDefualt);
      request.input("as_ops_mode", mssql.VarChar(20), req.body.OpsMode);
      request.input("ai_logged_user_id", mssql.BigInt, req.LoggedUserId);

      request.output("p_rettype", mssql.Int);
      request.output("p_retmsg", mssql.VarChar(mssql.MAX));

      const result = await request.execute("PKG_CUSTOMER$p_save_user_address");
      const output = await handleReps(result.output);
      res.status(200).json(output);
    } catch (e) {
      res.status(500).json({ err: "Error Occur" + e });
    }
  }
  static GetUserAddress = async (req, res) => {
    try {
      const request = await dataAcces.getRequest();
      request.input("ai_user_id", mssql.BigInt, req.LoggedUserId);
      request.input("ai_address_id", mssql.BigInt, req.query.AddressId);

      const result = await request.execute("PKG_CUSTOMER$p_get_user_address");

      res.status(200).json(result.recordsets);

    } catch (e) {
      res.status(500).json({ err: "Error Occur" + e });
    }
  }
  static GetCheckDetails = async (req, res) => {
    try {
      const request = await dataAcces.getRequest();
      request.input("ai_user_id", mssql.BigInt, req.LoggedUserId);

      const result = await request.execute("PKG_CUSTOMER$p_get_checkout_details");

      res.status(200).json(result.recordsets);
    } catch (e) {
      res.status(500).json({ err: "Error Occur" + e });
    }
  }
  static SaveUserOrder = async (req, res) => {
    try {
      const request = await dataAcces.getRequest();

      request.input("ai_order_id", mssql.BigInt, req.body.OrderId);
      request.input("ai_user_id", mssql.BigInt, req.body.UserId);
      request.input("ai_cart_id", mssql.BigInt, req.body.CartId);
      request.input("ai_logged_user_id", mssql.BigInt, req.LoggedUserId);
      request.input("as_ops_mode", mssql.VarChar(40), req.body.OpsMode)

      request.output("p_rettype", mssql.TinyInt);
      request.output("p_retmsg", mssql.VarChar(mssql.MAX));

      const result = await request.execute("PKG_ORDER$p_save_order");
      const output = await handleReps(result.output);

      res.status(200).json(output);
    } catch (e) {
      res.status(500).json({ err: "Error Occur" + e });
    }
  }
  static SavePlaceOrder = async (req, res) => {
    try {
      const request = await dataAcces.getRequest();

      request.input("ai_order_id", mssql.BigInt, req.body.OrderId);
      request.input("ai_user_id", mssql.BigInt, req.body.UserId ?? req.LoggedUserId);
      request.input("as_payment_mode", mssql.VarChar(100), req.body.PaymentMode);
      request.input("as_ops_mode", mssql.VarChar(40), req.body.OpsMode);
      request.input("as_razorpay_order_id", mssql.NVarChar(400), req.body.RazorpayOrderId);
      request.input("as_razorpay_payment_id", mssql.NVarChar(400), req.body.RazorpayPaymentId);
      request.input("as_razorpay_signature", mssql.NVarChar(400), req.body.RazorpaySignature);
      request.input("as_payment_status", mssql.VarChar(100), req.body.PaymentStatus);

      // Output parameters
      request.output("p_rettype", mssql.TinyInt);
      request.output("p_retmsg", mssql.VarChar(mssql.MAX));

      const result = await request.execute("PKG_ORDER$p_save_place_order");
      const output = await handleReps(result.output);

      res.status(200).json(output);
    } catch (e) {
      res.status(500).json({ err: "Error Occur" + e });
    }
  }
  static GetOrderDetails = async (req, res) => {
    try {
      const request = await dataAcces.getRequest();
      request.input("ai_user_id", mssql.BigInt, req.LoggedUserId);
      request.input("ai_order_id", mssql.BigInt, req.query.OrderId);
      request.input("as_status", mssql.BigInt, req.query.Status);

      const result = await request.execute("PKG_ORDER$p_get_user_order");

      res.status(200).json(result.recordsets);
    } catch (e) {
      res.status(500).json({ err: "Error Occur" + e });
    }
  }

  static GetOrderInvoice = async (req, res) => {
    try {
      const request = await dataAcces.getRequest();
      request.input("ai_order_id", mssql.BigInt, req.query.OrderId);
      request.input("ai_user_id", mssql.BigInt, req.LoggedUserId);

      const result = await request.execute("PKG_REPORT$p_get_order_pdf");

      const orderData = {
        SolidByAddress: result.recordsets[0],
        ShippingAddress: result.recordsets[1],
        BillingAddress: result.recordsets[2],
        ProductDetails: result.recordsets[3],
        AmountDetails: result.recordsets[4],
        imageList: {}
      };

      const imagePath = path.join(__dirname, '../../uploads/logo/image.png');
      const imageData = await fsp.readFile(imagePath);
      const base64Image = `data:image/png;base64,${imageData.toString('base64')}`;

      // Add image to data
      orderData.imageList = {
        ImgPath: base64Image
      };
      const pdfordername = `invoice - ${orderData.SolidByAddress[0].OrderNo}`

      const pdfBuffer = await MainController.GeneratePdf(orderData, 'invoice');

      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=invoice-${pdfordername}.pdf`,
        'Content-Length': pdfBuffer.length
      });

      res.end(pdfBuffer);
    } catch (e) {
      console.error('PDF generation failed:', e);
      res.status(500).json({ err: "Error Occurred: " + e.message });
    }
  }

  static GetDynamicWindowRender = async (req, res) => {
    try {
      const request = await dataAcces.getRequest();
      request.input("as_groupname", mssql.VarChar(50), req.query.GroupName);

      const result = await request.execute("PKG_SETTINGS$p_get_dynamic_pages");

      res.status(200).json(result.recordset);
    } catch (e) {
      res.status(500).json({ err: "Error Occur" + e });
    }
  }
  static GetDynamicWindowRenderValue = async (req, res) => {
    try {
      const request = await dataAcces.getRequest();
      request.input("as_group_name", mssql.VarChar(50), req.query.GroupName);
      request.input("as_ht_code", mssql.VarChar(50), req.query.HtCode);

      const result = await request.execute("PKG_SETTINGS$p_get_dynamic_page");

      res.status(200).json(result.recordset);
    } catch (e) {
      res.status(500).json({ err: "Error Occur" + e });
    }
  }

}

module.exports = User;
