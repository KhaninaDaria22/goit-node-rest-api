import mongoose from "mongoose";
import { handleMongooseError } from "../helpers/handleMongoseError.js";

const userSchema = new mongoose.Schema(
    {
        password: {
          type: String,
          required: [true, 'Password is required'],
        },
        email: {
          type: String,
          required: [true, 'Email is required'],
          unique: true,
        },
        subscription: {
          type: String,
          enum: ["starter", "pro", "business"],
          default: "starter"
        },
        token: {
          type: String,
          default: " ",
        },
        verify: {
          type: Boolean,
          default: false,
        },
        verificationCode: {
          type: String,
          default: ""
        }
        
}, {versionKey: false, timestamps: true});

userSchema.post("save", handleMongooseError);

export default mongoose.model("User", userSchema);
