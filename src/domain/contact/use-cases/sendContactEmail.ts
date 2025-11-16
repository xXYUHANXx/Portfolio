"use server";

import { Resend } from "resend";
import {
  contactFormSchema,
  type ContactForm,
} from "@/domain/contact/entities/ContactForm";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: ContactForm) {
  const validatedFields = contactFormSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      success: false,
      error: "Invalid fields.",
    };
  }

  const { name, email, message } = validatedFields.data;

  try {
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #f4f4f4; padding: 20px; text-align: center;">
          <h1 style="margin: 0; color: #333;">New Message from Portfolio</h1>
        </div>
        <div style="padding: 20px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px 0; font-weight: bold; width: 100px;">Name:</td>
              <td style="padding: 10px 0;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px 0; font-weight: bold;">Email:</td>
              <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; vertical-align: top;">Message:</td>
              <td style="padding: 10px 0; white-space: pre-wrap;">${message}</td>
            </tr>
          </table>
        </div>
        <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #777;">
          <p style="margin: 0;">This email was sent from the contact form on your personal portfolio.</p>
        </div>
      </div>
    `;

    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "yuhanpicos740@gmail.com",
      subject: `New message from ${name} via portfolio`,
      reply_to: email,
      html: emailHtml,
    });

    if (data.error) {
      return { success: false, error: data.error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: "Failed to send message." };
  }
}
