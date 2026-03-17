// Nodemailer configuration
import dotenv from 'dotenv';

// Load env vars before reading them
dotenv.config({ path: '.env.local' });
dotenv.config(); // fallback to .env

export const NODEMAILER_CONFIG = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || '',
  },
};

export const SENDER_EMAIL = process.env.EMAIL_USER || '';
export const RECIPIENT_EMAIL = process.env.CONTACT_EMAIL || 'sarunas.jaraminas@gmail.com';

export interface EmailRequest {
  from_name: string;
  from_email: string;
  message: string;
  language: 'en' | 'lt';
}
