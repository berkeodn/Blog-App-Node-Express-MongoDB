const jwt = require('jsonwebtoken');

const isAuthenticated = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        console.log(token);
        let decodedData;

        if(token){
            decodedData = jwt.verify(token, process.env.SECRET_TOKEN)

            req.userId = decodedData?._id
        } else {
            decodedData = jwt.decode(token)

            req.userId = decodedData?.sub
        }
        next()
    } catch (error) {
        console.log(error);
    }
}

module.exports = isAuthenticated