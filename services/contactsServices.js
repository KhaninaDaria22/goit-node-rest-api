import * as fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const contactsPath = path.resolve("./db/contacts.json");

async function readFile() {
    const data = await fs.readFile(contactsPath, {encoding: "utf-8"});

    return JSON.parse(data);
}


async function writeFile(contacts) {
    return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}



async function listContacts() {
    const contacts = await readFile();
    return contacts;
  }
  
  async function getContactById(contactId) {
    const contacts = await readFile();
    const contact = contacts.find((contact) => contact.contactId === contactId);

    if( typeof contact === "undefined") {
        return null;
    }
    return contact;
}
  
  async function removeContact(contactId) {
    const contacts = await readFile();

    const index = contacts.findIndex((contact) => contact.contactId === contactId);

    if (index === -1) {
        return null;
    }

    const removeContact = contacts[index];

    contacts.splice(index, 1);
    await writeFile(contacts);

    return removeContact;
}
  
  async function addContact(name, email, phone) {
    const contacts = await readFile();

    const newContacts = {name, email, phone, contactId: crypto.randomUUID()};

    contacts.push(newContacts);
    await writeFile(contacts);

    return newContacts;
}

async function updateContacts(contactId, data ) {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.contactId === contactId);
    if(index === -1) {
        return null;
    }
    const contactToUpdate = contacts.find((contact) => contact.contactId  === contactId);
    contacts[index] = { id, ...contactToUpdate, ...data };
  
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
}

export {listContacts,getContactById, removeContact, addContact, updateContacts};