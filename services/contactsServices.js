const fs = require("node:fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.join(__dirname, "./db/contacts.json");

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

module.exports =  {listContacts,getContactById, removeContact, addContact };