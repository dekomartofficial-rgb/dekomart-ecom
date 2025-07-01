const dataAcces = require('../database/dataaccess')
const mssql = require('mssql')
const fs = require('fs')
const fsp = fs.promises
const path = require('path');
const { handleReps } = require('./common.controller')
const hbs = require('hbs');
const puppeteer = require('puppeteer');


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
        const finalPath = path.join(fileStorage, attachType.toLowerCase(), String(id));
        if (!fs.existsSync(finalPath)) {
            fs.mkdirSync(finalPath, { recursive: true });
        }

        return finalPath;
    };

    static saveAttachment = async (UploadFile, FileId, FileType, LoggedUser) => {
        try {
            const singleFile = Array.isArray(UploadFile) ? UploadFile : [UploadFile];
            const fileStorageArr = await this.getSystemParmValue('FILE_STORAGE');
            const fileStorage = Array.isArray(fileStorageArr) ? fileStorageArr[0] : fileStorageArr;
            const uploadDir = await this.getFilePath(fileStorage, FileId, FileType);

            if (FileId > 0 && UploadFile && singleFile.length > 0) {
                for (const file of singleFile) {
                    const fileName = Date.now() + '-' + file.originalname.trim();
                    const filePath = path.join(uploadDir, fileName);

                    await new Promise((resolve, reject) => {
                        fs.writeFile(filePath, file.buffer, async (err) => {
                            if (err) {
                                return reject(err);
                            }
                            try {
                                const result = await this.uploadDocument(0, FileId, FileType, filePath, file.originalname, file.mimetype, null, 1, 'INSERT', LoggedUser);
                                resolve();
                            } catch (dbErr) {
                                reject(dbErr);
                            }
                        });
                    });
                }
            }
        } catch (e) {
            throw e;
        }
    };

    static DeleteAttchment = async (req, res) => {
        try {
            const filepath = req.body.filePath
            await fsp.unlink(filepath);
            await this.uploadDocument(req.body.DocumentId, null, null, null, null, null, null, 0, 'DELETE', req.LoggedUser);
            res.status(200).json({ MessageType: 2, Message: 'Document Deleted Successfully' });
        } catch (err) {
            console.error('Error deleting file:', err);
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
    static GeneratePdf = async (data, templateName, res = null) => {
        try {
            const filePath = path.join(__dirname, `../templates/${templateName}.hbs`);
            const htmlTemplate = await fsp.readFile(filePath, 'utf-8');
            const template = hbs.compile(htmlTemplate);
            const html = template(data);

            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.setContent(html);
            const pdfBuffer = await page.pdf({ format: 'A4' });
            await browser.close();

            if (res) {
                console.error('Error generating PDF:', e); 
                res.set({
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': 'inline; filename="document.pdf"',
                    'Content-Length': pdfBuffer.length
                });
                res.end(pdfBuffer);
                return;
            }
            return pdfBuffer;
        } catch (e) {
            if (res) {
                res.status(500).send('Failed to generate PDF');
            }
            throw e
        }
    }
}



module.exports = MainController