const jwt = require('jsonwebtoken');


//middleware
const verifyToken =(req, res, next)=>{
    const authHeader = req.headers.token;
    if(authHeader){
        jwt.verify(authHeader, process.env.JWT_SEC, (err, user)=>{
            if(err) res.status(403).json("Token is not valid!");
            req.user = user;
            next();
        })
    }else{
        return res.status(401).json("You are not authenticated!");
    }

}

const verifyTokenAndAuthorization = (req, res, next) =>{
    verifyTokenAndAuthorization(req, res, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }else{
            res.status(403).json("You are not allowed to do that!");
        }
    });

}

module.exports = { verifyToken, verifyTokenAndAuthorization };