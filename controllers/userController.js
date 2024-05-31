import HttpError from "../helpers/HttpError.js";
import  User  from "../db/user.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import fs from "fs/promises";
import path from "path";
import gravatar from "gravatar";
import Jimp from "jimp";
import { nanoid } from "nanoid";
import sendEmail from "../helpers/sendEmail.js"

const{ SECRET_KEY, BASE_URL}  = process.env
const avatarsDir = path.resolve("public", "avatars");


export const register = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user) {
         throw HttpError(409, "Email already in user");
    }
    const createHashPassword = await bcrypt.hash(password, 10) 
    const avatarURL = gravatar.url(email);
    const verificationCode = nanoid()

    const newUser = await User.create({...req.body, password: createHashPassword, avatarURL, verificationCode});
    const verifyEmail = {
      to: email, 
      subject: "Very email",
      html: `<a target="_blank" href="${BASE_URL}/api/user/verify/${verificationCode}">Click verify email</a>`
    }

    res.status(201).json({
        email: newUser.email,
        name: newUser.name,
    })


}

export const verifyEmail = async(req, res) => {
  const {verificationCode} = req.params;
  const user =await User.findOne({verificationCode});
  if(!user) {
    throw HttpError(401, "Email not Found");
  }
  await User.findByIdAndUpdate(user._id, {verify: true, verificationCode: ""});

  res.json ({
    menssage: "Email verify succes"
  })
}

export const resendVerifyEmail = async(req, res) => {
  const {email} = req.body;
  const user = await User.findOne({email});
  if(!user) {
    throw HttpError(401, "Email not found");
  }
  if( user.verify) {
    throw HttpError(401,"Email already verify");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/user/verify/${verificationCode}">Click verify email</a>`
  };
  await sendEmail(verifyEmail);

  res.json({
    message: "Verify email send succes"
  })

}




export const login = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(!user) {
        throw HttpError(401, "Email or passwoer invalid");
    }

    if(!user.verify) {
      throw HttpError(401, "Email not verified");

    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw HttpError(401, "Email or passwoer invalid");
    }

    const payload = {
        id: user._id,
    }
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "24h"});
    await User.findOneAndUpdate(user._id, {token})
    res.status(200).json({
        token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
    });
}

export const getCurrent = async(req, res)=> {
    const {email, name} = res.user;

    res.json({
        email,
        subscription,
      });
}

export const logout = async(req, res) => {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: ""});

    res.json({
        message: "Logout succes",
    })
}

export const updateAvatar = async (req, res, next) => {
    try {
      const { _id } = req.user;
      if (!req.file) {
        throw HttpError(400, "Please, attach avatar.It is required.");
      }
  
      const { path: tempUpload, originalname } = req.file;
      const fileName = `${_id}_${originalname}`;
      const resultUpload = path.resolve(avatarsDir, fileName);
  
      const image = await Jimp.read(tempUpload);
      image.resize(250, 250).write(tempUpload);
      await fs.rename(tempUpload, resultUpload);
  
      const avatarURL = path.join("avatars", fileName);
      await User.findByIdAndUpdate(_id, { avatarURL });
  
      res.json({
        avatarURL,
      });
    } catch (error) {
      next(error);
    }
  };