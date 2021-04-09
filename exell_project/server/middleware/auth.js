import jwt from "jsonwebtoken";

const secret = 'QHhpZGlvCg==';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData;

        if (token && isCustomAuth) {      
        decodedData = jwt.verify(token, secret);

        req.userId =  decodedData.id ? decodedData.id : undefined; //decodedData?.id;
        } else {
        decodedData = jwt.decode(token);

        req.userId = decodedData.sub ? decodedData.sub : undefined;// decodedData?.sub;
        }    

        next();
    } catch (error) {
        console.log(error);
    }
};

export default auth;
