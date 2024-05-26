import express from "express";
import { isValidId } from "../helpers/isvalidid.js"
import validateBody  from "../helpers/validateBody.js"
import {registerUsertSchema, loginSchema} from "../schemas/userShema.js"
import { register, login, logout, updateAvatar} from "../controllers/userController.js";
import { authenticate } from "../helpers/authenticate.js";
import { getCurrent } from "../controllers/userController.js";
import upload from "../middelwares/upload.js";

const userRouter = express.Router();

userRouter.post("/register",validateBody(registerUsertSchema), register);

userRouter.post("/login", validateBody(loginSchema), login );

userRouter.get("/current", authenticate, getCurrent);

userRouter.post("/logout", authenticate, logout);

userRouter.patch("/avatars", authenticate, upload.single('avatar'), updateAvatar);

export default userRouter;
