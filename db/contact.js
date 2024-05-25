import mongoose, { Schema } from "mongoose";
import { handleMongooseError } from "../helpers/handleMongoseError.js";
import Joi from 'joi';

const { required } = Joi;

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
      favorite: {
        type: Boolean,
        default: false,
      },
      owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
      }
}, {versionKey: false, timeseries: true});

contactSchema.post("save",(handleMongooseError));


export default mongoose.model("Contact", contactSchema);