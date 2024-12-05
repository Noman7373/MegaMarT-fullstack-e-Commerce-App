import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.RESEND_API) {
  throw new Error("RESEND_API key is missing in environment variables.");
}

const resend = new Resend(process.env.RESEND_API);

const sendEmail = async ({ sendTo, subject, html }) => {
  try {
    if (!sendTo || !subject || !html) {
      throw new Error("Missing required parameters: sendTo, subject, or html.");
    }

    const { data, error } = await resend.emails.send({
      from: "ShopHub <onboarding@resend.dev>",
      to: sendTo,
      subject: subject,
      html: html,
    });

    if (error) {
      return console.log(error);
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export default sendEmail;
