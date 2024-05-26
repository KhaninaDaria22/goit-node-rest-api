import HttpError from "../helpers/HttpError.js";
import  User  from "../db/user.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import fs from "fs/promises";
import path from "path";
import gravatar from "gravatar";
import Jimp from "jimp";

const{ SECRET_KEY}  = process.env
const avatarsDir = path.resolve("public", "avatars");


export const register = async(req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
       throw new HttpError(409, "Email already in use");
  }
  const createHashPassword = await bcrypt.hash(password, 10) 
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({...req.body, password: createHashPassword, avatarURL });
  
  res.status(201).json({
      email: newUser.email,
      name: newUser.name,
  });
}

export const login = async(req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
      throw new HttpError(401, "Email or password invalid");
  }

  if (!password || typeof password !== 'string') {
      throw new HttpError(400, "Password is required and must be a string");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
      throw new HttpError(401, "Email or password invalid");
  }

  const payload = {
      id: user._id,
  }
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
      token,
      user: {
        email: user.email,
        name: user.name,
      },
  });
}

export const getCurrent = async(req, res)=> {
    const {email, name} = res.user;

    res.json({
        email,
        name,
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
      throw new HttpError(400, "Please, attach avatar. It is required.");
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