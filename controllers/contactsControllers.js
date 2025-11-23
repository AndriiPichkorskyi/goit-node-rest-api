import HttpError from "../helpers/HttpError.js";
import contactsService from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  const { id: owner } = req.user;
  const { page, limit, favorite } = req.query;

  const contacts = await contactsService.listContacts({
    page,
    limit,
    favorite,
    owner,
  });

  res.status(200).json(contacts);
};

export const getOneContact = async (req, res, next) => {
  const { id } = req.params;
  const { id: owner } = req.user;

  const contact = await contactsService.getContactById({ id, owner });
  if (!contact) return next(HttpError(404));
  res.json(contact);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;

  const contact = await contactsService.removeContact({ id, owner });
  if (!contact) throw HttpError(404);
  res.json(contact);
};

export const createContact = async (req, res) => {
  const { id: owner } = req.user;

  const newContact = await contactsService.addContact({ ...req.body, owner });
  res.status(201).json(newContact);
};

export const updateContact = async (req, res) => {
  const id = req.params.id;
  const { id: owner } = req.user;

  const updatedContact = await contactsService.updateContact(
    { id, owner },
    req.body
  );

  if (!updatedContact) throw HttpError(404);
  res.status(200).json(updatedContact);
};

export const updateFavoriteContact = async (req, res) => {
  const id = req.params.id;
  const { id: owner } = req.user;
  const updatedContact = await contactsService.updateStatusContact(
    { id, owner },
    req.body
  );
  if (!updatedContact) throw HttpError(404);
  res.status(200).json(updatedContact);
};
