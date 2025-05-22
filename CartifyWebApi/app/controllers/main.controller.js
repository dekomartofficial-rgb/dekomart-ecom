const multer = require('multer');
const axios = require('axios');
const VerifyToken = require("../middleware/AuthMiddleware");
require("dotenv").config();

const apiUrl = axios.create({ baseURL: process.env.NODE_ENV })

async function fetchApiData(params, req) {
    try {
        console.log(header)
        if (req.header('Authorization')) {
            token = req.header('Authorization')?.split(" ")[1]
        }
        const response = await apiUrl.get(params, {
            headers: {
                Authorization: token
            }
        })

        return response.data;
    } catch (error) {
        console.error(`Error While Fetch Api ${params} : `, error);
        throw error;
    }
}
function getFilePath(id, attach_type) {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => { cb(null, 'uploads/'); },
        filename: (req, file, cb) => { cb(null, Date.now() + '-' + file.originalname); }
    });
    return storage;
}

async function getSystemParm(parmCode, req) {
    try {
        const apiUrl = `admin/GetSystemParm?ParmCode=${parmCode}`;
        const data = await fetchApiData(apiUrl, req)
        return data
    } catch (e) {
        return e
    }
}


module.exports = { getFilePath, fetchApiData, getSystemParm }