import jwt from "jsonwebtoken"

// Secret key
const secret = 'QHhpZGlvCg=='

const auth = async (req, res, next) => {
    try {

        // Read token from request
        const token = req && req.headers && req.headers.authorization ? req.headers.authorization.split(" ")[1] : false

        // Check token for length (to chek if it is custom or from google auth)
        // const isCustomAuth = token.length < 500

        let decodedData;

        // If token is read and has length less then 500 characters (custom)
        // if (token && isCustomAuth) {
        if (token) {

            // Returns the decoded payload with verifying if the signature is valid
            decodedData = jwt.verify(token, secret)

            // Join user id to request
            // Join user id to request
            req.userId =  !!decodedData ? decodedData.id : undefined //decodedData?.id;

        } 
        
        // // If token isn't read and has length more then 500 characters (for google auth)
        // else {

        //     // Returns the decoded payload without verifying if the signature is valid
        //     decodedData = jwt.decode(token); // return null on token === false

        //     
        //     // Join user id to request
        //     req.userId = !!decodedData ? decodedData.sub : undefined;// decodedData?.sub;
        //     //sub - identificator for google
        // }    

        next()
    } catch (error) {
        console.log(error)
    }
};

export default auth
