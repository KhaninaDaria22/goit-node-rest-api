import express from "express";
import {getAllContacts,getOneContact, deleteContact, createContact, updateContact,updateFavorite} from "../controllers/contactsControllers.js";
import { isValidId } from "../helpers/isvalidid.js"
import validateBody  from "../helpers/validateBody.js"
import {createContactSchema, updateContactSchema, updateFavoriteSchema } from "../schemas/contactsSchemas.js"

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", isValidId, getOneContact);

contactsRouter.delete("/:id",isValidId,  deleteContact);

contactsRouter.post("/", validateBody(createContactSchema) , createContact);

contactsRouter.put("/:id", validateBody(updateContactSchema), isValidId, updateContact);

contactsRouter.patch("/:id/favorite", isValidId, validateBody(updateFavoriteSchema), updateFavorite);
export default contactsRouter;
