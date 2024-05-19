import Contact from "../db/contact.js"
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
    try {
        const { _id: owner } = req.user;
        const {page = 1, limit = 10} = req.query;
        const skip = (page - 1) * limit;
        const result = await Contact.find({owner}, "name email phone favorite", {skip , limit}).populate("owner");
        res.json(result);
    } catch(error) {
        next(error);
    }
};

export const getOneContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Contact.findById(id);
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
        const result = await Contact.findByIdAndDelete(id);
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
        const { _id: owner } = req.user;
        const result = await Contact.create(...req.body, owner);
        res.status(201).json(result);
    } catch(error) {
        next(error);
    }
};

export const updateContact = async (req, res, next) => {
    try {
        const keys = Object.keys(req.body);

        if(keys.length === 0) {
            throw HttpError(400, "Body must have at least one field");
        }
        const {id} = req.params;
        const result = await Contact.findByIdAndUpdate(id, req.body);
        if (!result) {
             throw HttpError(404, "Not found")
        }
        res.json(result);
    } catch(error) {
        next(error);
    }
};

  export const updateFavorite = async (req, res, next) => {
    try {
        const keys = Object.keys(req.body);

        if(keys.length === 0) {
            throw HttpError(400, "missing field favorite");
        }
        const {id} = req.params;
        const result = await Contact.findByIdAndUpdate(id, req.body);
        if (!result) {
             throw HttpError(404, "Not found")
        }
        res.json(result);
    } catch(error) {
        next(error);
    }
};

