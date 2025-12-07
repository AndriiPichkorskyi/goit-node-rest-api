import { generateTemplate } from "./emailTemplate.js";

export const createVerifyEmail = (email, verificationToken) => {
  const mail = {
    to: email,
    subject: "Verify email",
    // html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click verify email</a>`,
    html: generateTemplate(verificationToken),
  };

  return mail;
};
