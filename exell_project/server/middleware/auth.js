import jwt from "jsonwebtoken";

const secret = 'QHhpZGlvCg==';

const auth = async (req, res, next) => {
    try {

        const token = req && req.headers && req.headers.authorization ? req.headers.authorization.split(" ")[1] : false;
        const isCustomAuth = token.length < 500;

        let decodedData;

        if (token && isCustomAuth) {      
            decodedData = jwt.verify(token, secret);

            req.userId =  !!decodedData ? decodedData.id : undefined; //decodedData?.id;
        } else {
            decodedData = jwt.decode(token); // return null on token === false

            req.userId = !!decodedData ? decodedData.sub : undefined;// decodedData?.sub;
        }    

        next();
    } catch (error) {
        console.log(error);
    }
};

export default auth;
