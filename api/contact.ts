import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import {
  NODEMAILER_CONFIG,
  RECIPIENT_EMAIL,
  SENDER_EMAIL,
  type EmailRequest,
} from '../lib/config/nodemailer';

// ---------- Bilingual email templates ----------
interface EmailTemplates {
  subject: string;
  heading: string;
  body1: string;
  body2: string;
  yourMessage: string;
  footer: string;
}

const autoResponseTemplates: Record<string, (name: string) => EmailTemplates> = {
  en: (name: string) => ({
    subject: "We've received your message — SUPERWOW TECH",
    heading: `Hi ${name},`,
    body1: "Thanks for your message! We've received your request and will do our best to respond as soon as possible.",
    body2: 'Respectfully,<br/><strong>Superwow Tech</strong>',
    yourMessage: 'Your message:',
    footer: '&copy; SUPERWOW TECH &mdash; Vilnius, Lithuania',
  }),
  lt: (name: string) => ({
    subject: 'Gavome jūsų žinutę — SUPERWOW TECH',
    heading: `Sveiki, ${name},`,
    body1: 'Ačiū už jūsų žinutę! Gavome jūsų užklausą ir pasistengsime į ją kuo greičiau atsakyti.',
    body2: 'Pagarbiai,<br/><strong>Superwow Tech</strong>',
    yourMessage: 'Jūsų žinutė:',
    footer: '&copy; SUPERWOW TECH &mdash; Vilnius, Lietuva',
  }),
};

function buildAutoResponseHtml(t: EmailTemplates, message: string): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <p style="color: #333; font-size: 16px;">${t.heading}</p>
      <p style="color: #333; line-height: 1.6;">
        ${t.body1}
      </p>
      <p style="color: #333; line-height: 1.6;">
        ${t.body2}
      </p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
      <p style="color: #999; font-size: 12px; margin: 0;">
        ${t.footer}
      </p>
    </div>
  `;
}

function buildAutoResponseText(t: EmailTemplates): string {
  return `${t.heading.replace(/<[^>]*>/g, '')}

${t.body1.replace(/<[^>]*>/g, '')}

${t.body2.replace(/<[^>]*>/g, '')}`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { from_name, from_email, message, language }: EmailRequest = req.body;

    // Validate required fields
    if (!from_name || !from_email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(from_email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check if Nodemailer is configured
    if (!NODEMAILER_CONFIG.auth.user || !NODEMAILER_CONFIG.auth.pass) {
      return res.status(500).json({
        error: 'Email service is not configured. Please check your environment variables.',
      });
    }

    const lang = language === 'lt' ? 'lt' : 'en';

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: NODEMAILER_CONFIG.host,
      port: NODEMAILER_CONFIG.port,
      secure: NODEMAILER_CONFIG.secure,
      auth: NODEMAILER_CONFIG.auth,
    });

    // Verify transporter configuration
    await transporter.verify();

    // Build bilingual auto-response
    const template = autoResponseTemplates[lang](from_name);

    // 1. Auto-reply email to customer
    const autoReplyOptions = {
      from: `"Superwow Tech Studio" <${SENDER_EMAIL}>`,
      to: from_email,
      subject: template.subject,
      text: buildAutoResponseText(template),
      html: buildAutoResponseHtml(template, message),
    };

    // 2. Notification email to recipient
    const notificationOptions = {
      from: `"${from_name}" <${SENDER_EMAIL}>`,
      replyTo: from_email,
      to: RECIPIENT_EMAIL,
      subject: `New Contact Form Submission from ${from_name}`,
      text: `${message}\n\nLanguage: ${lang.toUpperCase()}\nFrom: ${from_name} <${from_email}>`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="white-space: pre-wrap; line-height: 1.6; margin-bottom: 20px;">${message}</div>
          <p style="color: #666; font-size: 14px;">Language: ${lang.toUpperCase()} | From: ${from_name} &lt;${from_email}&gt;</p>
        </div>
      `,
    };

    // Send both emails in parallel
    await Promise.all([
      transporter.sendMail(autoReplyOptions),
      transporter.sendMail(notificationOptions),
    ]);

    return res.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Nodemailer Error:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to send email',
    });
  }
}
