import HttpError from "../helpers/HttpError.js";
import contactsService from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  const contacts = await contactsService.listContacts();
  res.status(200).json(contacts);
};

export const getOneContact = async (req, res, next) => {
  const id = req.params.id;
  const contact = await contactsService.getContactById(id);
  if (!contact) return next(HttpError(404));
  res.json(contact);
};

export const deleteContact = async (req, res) => {
  const id = req.params.id;
  const contact = await contactsService.removeContact(id);
  if (!contact) throw HttpError(404);
  res.json(contact);
};

export const createContact = async (req, res) => {
  const newContact = await contactsService.addContact(req.body);
  res.status(201).json(newContact);
};

export const updateContact = async (req, res) => {
  const id = req.params.id;
  const updatedContact = await contactsService.updateContact(id, req.body);
  if (!updatedContact) throw HttpError(404);
  res.status(200).json(updatedContact);
};

export const updateFavoriteContact = async (req, res) => {
  const id = req.params.id;
  const updatedContact = await contactsService.updateStatusContact(
    id,
    req.body
  );
  if (!updatedContact) throw HttpError(404);
  res.status(200).json(updatedContact);
};
