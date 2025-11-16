import path from "node:path";
import { fileURLToPath } from "node:url";
import Contact from "../db/models/Contacts.js";

async function listContacts() {
  // Повертає масив контактів.
  return Contact.findAll();
}

async function getContactById(contactId) {
  // Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  return Contact.findByPk(contactId);
}

async function removeContact(contactId) {
  // Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const contact = await getContactById(contactId);
  if (!contact) return null;
  await contact.destroy();
  return contact;
}

async function addContact(payload) {
  // Повертає об'єкт доданого контакту (з id).
  return Contact.create(payload);
}

async function updateContact(contactId, payload) {
  const contact = await getContactById(contactId);
  if (!contact) return null;

  await contact.update(payload);
  return contact;
}

async function updateStatusContact(contactId, payload) {
  const contact = await getContactById(contactId);
  if (!contact) return null;

  await contact.update(payload);
  return contact;
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
