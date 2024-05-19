import express from "express";
import {getAllContacts,getOneContact, deleteContact, createContact, updateContact,updateFavorite} from "../controllers/contactsControllers.js";
import { isValidId } from "../helpers/isvalidid.js"
import validateBody  from "../helpers/validateBody.js"
import {createContactSchema, updateContactSchema, updateFavoriteSchema } from "../schemas/contactsSchemas.js"
import {authenticate} from "../helpers/authenticate.js"

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, getAllContacts);

contactsRouter.get("/:id", authenticate, isValidId, getOneContact);

contactsRouter.delete("/:id", authenticate, isValidId,  deleteContact);

contactsRouter.post("/", authenticate, validateBody(createContactSchema) , createContact);

contactsRouter.put("/:id", authenticate, validateBody(updateContactSchema), isValidId, updateContact);

contactsRouter.patch("/:id/favorite", authenticate, isValidId, validateBody(updateFavoriteSchema), updateFavorite);
export default contactsRouter;
