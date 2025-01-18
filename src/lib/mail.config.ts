import nodemailer from 'nodemailer';

const emailConfig = {
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD
  },
  debug: true, // Enable debugging
  logger: true // Log to console
};

console.log('Email Config (sanitized):', {
  ...emailConfig,
  auth: { user: emailConfig.auth.user, pass: '****' }
});

export const transporter = nodemailer.createTransport(emailConfig);


export const adminEmail = process.env.EMAIL_SERVER_USER;