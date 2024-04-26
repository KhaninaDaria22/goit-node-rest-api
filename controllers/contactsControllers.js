import {listContacts, getContactById, removeContact, addContact}   from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
    try {
        const result = await listContacts();
        res.json(result);
    } catch(error) {
        next(error);
    }
};

export const getOneContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await getContactById(id);
        if (!result) {
            throw HttpError(404,"Not found");
        }
        return res.json(result)
    } catch(error) {
        next(error);
    }
};

export const deleteContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await removeContact(id);
        if(!result) {
            throw HttpError(404,"Not found");
        }  
        return res.json(result)
    } catch {
        next(error);
    }
};

export const createContact = async (req, res, next) => {
    try {
        const result = await addContact(req.body);
        res.status(201).json(result);
    } catch(error) {
        next(error);
    }
};

export const updateContact = (req, res) => {};
