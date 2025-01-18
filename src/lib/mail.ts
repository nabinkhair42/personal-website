import { transporter } from "./mail.config";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const WebsiteURL = process.env.PORTFOLIO_URL || 'https://nabinkhair.com.np';

export async function sendAdminNotification(data: FormData) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_SERVER_USER,
      subject: `📩 New Message from Your Portfolio: ${data.subject}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #444; line-height: 1.8;">
          <table style="width: 100%; max-width: 600px; margin: 20px auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
            <thead>
              <tr>
                <th style="padding: 20px; text-align: center; background-color: #2d89ef; color: #fff; font-size: 20px;">
                  ✨ New Message Alert ✨
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 20px; background-color: #fff;">
                  <p><strong>Name:</strong> ${data.name}</p>
                  <p><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #2d89ef; text-decoration: none;">${data.email}</a></p>
                  <p><strong>Subject:</strong> ${data.subject}</p>
                  <p><strong>Message:</strong></p>
                  <p style="padding: 15px; background-color: #f9f9f9; border-left: 4px solid #2d89ef; color: #555;">${data.message}</p>
                </td>
              </tr>
              <tr>
                <td style="padding: 15px; text-align: center; background-color: #f5f5f5; color: #666; font-size: 12px;">
                  You received this message from your portfolio contact form.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
    };

    console.log('Sending admin notification with options:', {
      ...mailOptions,
      html: '...[HTML Content]...'
    });

    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Admin notification error:', error);
    throw error;
  }
}

export async function sendUserConfirmation(data: FormData) {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: data.email,
    subject: "Thank you for your message!",
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #444; line-height: 1.8;">
        <table style="width: 100%; max-width: 600px; margin: 20px auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
          <thead>
            <tr>
              <th style="padding: 20px; text-align: center; background-color: #0078d7; color: #fff; font-size: 20px;">
                🎉 Thank You for Reaching Out!
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 20px; background-color: #fff;">
                <p>Hi <strong>${data.name}</strong>,</p>
                <p>Thank you for getting in touch! I've received your message about "<strong>${data.subject}</strong>" and will respond as soon as I can.</p>
                <p>If you'd like to provide more details, feel free to reply directly to this email.</p>
                <p>Best regards,<br><strong>Nabin Khair</strong></p>
              </td>
            </tr>
            <tr>
              <td style="padding: 15px; text-align: center; background-color: #f5f5f5; color: #666; font-size: 12px;">
                This email was sent from <strong>Nabin Khair</strong>. <br>
                Check it out at <a href=${WebsiteURL} style="color: #0078d7; text-decoration: none;">Nabin Khair</a>.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
  };

  return await transporter.sendMail(mailOptions);
}
