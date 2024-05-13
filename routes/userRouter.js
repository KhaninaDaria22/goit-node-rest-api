import express from "express";
import { isValidId } from "../helpers/isvalidid.js"
import validateBody  from "../helpers/validateBody.js"
import {registerUsertSchema, loginSchema} from "../schemas/userShema.js"
import { register, login } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register",validateBody(registerUsertSchema), register);
userRouter.post("/login", validateBody(loginSchema), login );
export default contactsRouter;
