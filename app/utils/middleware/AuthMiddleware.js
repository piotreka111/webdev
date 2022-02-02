const jwt = require('jsonwebtoken');

const authenticated = function (req, res, next) {
    try{
        const token = req.cookies?.jwtToken;
        req.user = jwt.verify(token, 'secretKey');
        next();
    }catch(e){
        res.render("401")
    }
};

module.exports = {
    authenticated,
};
