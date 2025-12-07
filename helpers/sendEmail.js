import nodemailer from "nodemailer";

const { UKR_NET_PASSWORD, UKR_NET_EMAIL } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: UKR_NET_EMAIL,
    pass: UKR_NET_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

/**
 *
 * @param {{to: string, text?: string, html?: string, subject: string}} payload
 * @returns {Promise}
 */
export const sendEmail = (payload) => {
  const email = Object.assign({}, payload, { from: UKR_NET_EMAIL });
  return transport.sendMail(email);
};
