const jwt = require('jsonwebtoken')

function VerifyToken(req, res, next){
    let token = ''
    if(req.header('Authorization')){
        token = req.header('Authorization')?.split(" ")[1] 
    }
    
    if(!token){
        return res.status(401).json({err: 'Access Denied'})
    } else{
        try {
            const decoded = jwt.verify(token, process.env.SECRET_TOKERN);
            req.userId = decoded.userId;
            next();
            } 
        catch (error) {
            res.status(401).json({ error: 'Invalid token' });
        }
    }
}

module.exports = VerifyToken;
