const jwt = require('jsonwebtoken')

const protect = async (req, res, next)=> {

    if (req.headers.authorization  && req.headers.authorization.startsWith('Bearer')){
        try{
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.user = decoded
            next();

        }
        catch(error){
            return res.status(401).json({ status: "bad", message: "Not authorized, token failed" });
        }
    }
}