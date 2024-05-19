import {HttpError} from "../helpers/HttpError";
import jwt from "jsonwebtoken";
import {User} from "../db/user";

const{ SECRET_KEY}  = process.env;

export const authenticate = async (req, res) => {
    const {authorization = " "} = req.headers;
    const [bearer, token] = authorization.split(" ");
    if( bearer !== "Bearer") {
        next(HttpError(401))
    }
    try {
        const {id} = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if( !user) {
            next(HttpError(401));
        }
        next();
    }
    catch(erro) {
        next(HttpError(401));
    }                         
}