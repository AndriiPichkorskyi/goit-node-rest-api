import Contact from "../db/models/Contacts.js";

async function listContacts({ page, limit, favorite, owner }) {
  // Повертає масив контактів.
  const options = {
    where: {
      owner,
    },
  };

  if (limit) {
    options.limit = limit;
    if (page && Number(page) > 0) {
      options.offset = (Number(page) - 1) * Number(limit);
    }
  }
  if (favorite === "true") options.where.favorite = true;

  return Contact.findAll(options);
}

async function getContactById(where) {
  // Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  return Contact.findOne({ where });
}

async function removeContact({ id, owner }) {
  // Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const contact = await getContactById({ id, owner });
  if (!contact) return null;
  await contact.destroy();
  return contact;
}

async function addContact(payload) {
  // Повертає об'єкт доданого контакту (з id).
  return Contact.create(payload);
}

async function updateContact(where, payload) {
  const contact = await getContactById(where);
  if (!contact) return null;

  await contact.update(payload);
  return contact;
}

async function updateStatusContact(where, payload) {
  const contact = await getContactById(where);
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
