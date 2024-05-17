const jwt = require('jsonwebtoken');

exports.requireLogin = (req, res, next) =>{
    try {
        if(req.headers.authorization){
            const token = req.headers.authorization.split(' ')[1];
            const decode = jwt.verify(token, "I'm muaaz");
            req.user = decode;
            next();
        }
        else{
            return res.status(400).json({error: 'Unauthorized'})
        }
    } catch (error) {
        console.log("Something went wrong");
    }
}