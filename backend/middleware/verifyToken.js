const jwt = require("jsonwebtoken")

function verify(req, res, next) {


    // const authHeader = req.cookies.accessToken;
    const authHeader = req.headers['authorization'];
    console.log(authHeader,"Auth header")

    


    // console.log(req.cookies.accessToken, "@@@@@@@@@@@@@@@@@@@@@@@@22");
    if (authHeader) {
        const token = authHeader;
        console.log(token,"Tokenn");
        // const {accessToken} =authHeader
        // const token = authHeader && authHeader.split(' ')[1];
        


        jwt.verify(token, "christy", async (err, user) => {
            req.user = user;
            if (err) res.status(403).json("token is not valid!",authHeader,token);

            next()
        })

    } else {
        return res.status(401).json("you are not authenticated")
    }



}

module.exports = verify;