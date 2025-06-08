const multer = require('multer');
const axios = require('axios');
const dataAcces = require('../database/dataaccess')
const mssql = require('mssql')
const fs = require('fs')
const path = require('path');
const { handleReps } = require('./common.controller')


class MainController {
    static getSystemParmValue = async (ParmCode) => {
        try {
            const request = await dataAcces.getRequest()
            request.input("as_parm_code", mssql.VarChar(20), ParmCode);
            const result = await request.execute("PKG_SETTINGS$p_get_sys_parm");
            return result.recordsets[0]?.map(item => item.parmValue)
        } catch (e) {
            throw e
        }

    }
    static getFilePath = async (fileStorage, id, attachType) => {
        const path = fileStorage + '\\' + attachType + '\\' + id
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
        }
        return path;
    }
    static saveAttachment = async (UploadFile, FileId, FileType, LoggedUser) => {
        try {
            console.log(UploadFile)
            const singleFile = Array.isArray(UploadFile) ? UploadFile : [UploadFile];
            const fileStorage = await this.getSystemParmValue('FILE_STORAGE')
            const uploadDir = await this.getFilePath(fileStorage, FileId, FileType)

            if (FileId > 0 && UploadFile && UploadFile.length > 0) {
                singleFile.forEach(file => {
                    const fileName = Date.now() + '-' + file.originalname.trim();
                    const filePath = path.join(uploadDir, fileName);

                    fs.writeFile(filePath, file.buffer, async (err) => {
                        if (err) {
                            console.log('File Upload Error:', err)
                            return false;
                        } else {
                            const result = await this.uploadDocument(0, FileId, FileType, filePath, file.originalname, file.mimetype, null, 1, 'INSERT', LoggedUser)
                            console.log('File saved:', result.Message, 'File Path:', filePath   );
                            return true
                        }
                    });
                })
            }

        } catch (e) {
            throw e
        }
    }
    static uploadDocument = async (DocumentId, KeyId, KeyType, DocPath, DocName, DocType, DocDesc, IsActive, OpsMode, LoggedUser) => {
        try {
            const request = await dataAcces.getRequest()

            request.input('ai_document_id', mssql.BigInt, DocumentId);
            request.input('ai_key_id', mssql.BigInt, KeyId);
            request.input('as_key_type', mssql.VarChar(10), KeyType);
            request.input('as_document_name', mssql.NVarChar(255), DocName);
            request.input('as_document_type', mssql.NVarChar(100), DocType);
            request.input('as_description', mssql.NVarChar(mssql.MAX), DocDesc);
            request.input('as_path', mssql.NVarChar(mssql.MAX), DocPath);
            request.input('ai_is_active', mssql.BigInt, IsActive);
            request.input('as_ops_mode', mssql.VarChar(20), OpsMode);
            request.input('ai_user_id', mssql.BigInt, LoggedUser);
            request.output("p_retmsg", mssql.VarChar(500));
            request.output("p_rettype", mssql.Int);

            const result = await request.execute("PKG_BASE$p_save_document")
            const output = await handleReps(result.output);
            return output
        } catch (e) {
            throw e
        }
    }
}



module.exports = MainController