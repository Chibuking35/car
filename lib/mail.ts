import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587, // Usually 587 or 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendVerificationEmail(to: string, token: string) {
  const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify?token=${token}`;

  await transporter.sendMail({
    from: `"My App" <${process.env.SMTP_USER}>`,
    to,
    subject: "Please verify your email",
    html: `
      <p>Thanks for registering! Click the link below to verify your email:</p>
      <a href="${verifyUrl}">${verifyUrl}</a>
      <p>This link expires in 1 hour.</p>
    `,
  });
}
