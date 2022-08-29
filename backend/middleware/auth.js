const jwt = require("jsonwebtoken");

const config = process.env

//Para entender como o usuario autenticado é enviado, veja esta thread:
//https://stackoverflow.com/questions/18875292/passing-variables-to-the-next-middleware-using-next-in-express-js

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token){
        return res.status(403).send("Token é necessário para autenticação.");
    }
    try{
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        res.locals.user = decoded;
    }catch(err){
        return res.status(401).send("Token invalido.");
    }
    return next();
};

module.exports = verifyToken;