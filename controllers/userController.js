import HttpError from "../helpers/HttpError.js";
import  User  from "../db/user.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

const{ SECRET_KEY}  = process.env

export const register = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user) {
         throw HttpError(409, "Email already in user");
    }
    const createHashPassword = await bcrypt.hash(password, 10) 

    const newUser = await User.create({...req.body, password: createHashPassword});
    
    res.status(201).json({
        email: newUser.email,
        name: newUser.name,
    })


}

export const login = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(!user) {
        throw HttpError(401, "Email or passwoer invalid");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw HttpError(401, "Email or passwoer invalid");
    }

    const payload = {
        id: user_id,
    }
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "24h"});
    await User.findOneAndUpdate(user._id, {token})

    res.json({
        token,
    })
}

export const getCurrent = async(req, res)=> {
    const {email, name} = res.user;

    res.json({
        email,
        name,
    })
}

export const logout = async(req, res) => {
    const {_id} = req.user;
    await User.findByIdAndUpdate({token: ""});

    res.json({
        message: "Logout succes",
    })
}