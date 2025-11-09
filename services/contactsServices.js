import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contactsPath = path.resolve(__dirname, "../", "db", "contacts.json");
console.log(contactsPath);

async function saveListContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), {
    encoding: "utf-8",
  });
}

async function listContacts() {
  // Повертає масив контактів.
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(data);
}

async function getContactById(contactId) {
  // Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);
  if (index === -1) return null;
  return contacts[index];
}

async function removeContact(contactId) {
  // Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);
  if (index === -1) return null;
  const [deletedContact] = contacts.splice(index, 1);
  await saveListContacts(contacts);
  return deletedContact;
}

async function addContact(name, email, phone) {
  // Повертає об'єкт доданого контакту (з id).
  const contacts = await listContacts();
  const uuid = crypto.randomUUID();
  contacts.push({ id: uuid, name, email, phone });
  await saveListContacts(contacts);
  return contacts[contacts.length - 1];
}

async function updateContact(contactId, name, email, phone) {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);
  if (index === -1) return null;

  const contact = contacts[index];
  contact.name = name || contact.name;
  contact.email = email || contact.email;
  contact.phone = phone || contact.phone;

  await saveListContacts(contacts);
  return contact;
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
