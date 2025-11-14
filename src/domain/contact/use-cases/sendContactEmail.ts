'use server';

import { Resend } from 'resend';
import { contactFormSchema, type ContactForm } from '@/domain/contact/entities/ContactForm';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: ContactForm) {
  const validatedFields = contactFormSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      success: false,
      error: 'Invalid fields.',
    };
  }
  
  const { name, email, message } = validatedFields.data;

  try {
    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'yuhanpicos740@gmail.com',
      subject: `New message from ${name} via portfolio`,
      reply_to: email,
      html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
    });

    if (data.error) {
        return { success: false, error: data.error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: 'Failed to send message.' };
  }
}
