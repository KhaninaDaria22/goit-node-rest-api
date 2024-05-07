import mongoose from "mongoose";
import { handleMongooseError } from "../helpers/handleMongoseError.js";

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
}, {versionKey: false, timeseries: true});

contactSchema.post("save",(handleMongooseError));


export default mongoose.model("Contact", contactSchema);