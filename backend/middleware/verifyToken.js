const jwt = require("jsonwebtoken")

function verify(req, res, next) {


    const authHeader = req.cookies.accessToken;

    console.log(req.cookies.accessToken, "@@@@@@@@@@@@@@@@@@@@@@@@22");
    if (authHeader) {
        const token = authHeader;

        jwt.verify(token, process.env.JWT, async (err, user) => {
            req.user=user;
            if (err) res.status(403).json("token is not valid!");

            next()
        })

    } else {
        return res.status(401).json("you are not authenticated")
    }



}

module.exports = verify;