const nodemailer = require('nodemailer');

exports.contact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    // send email if SMTP configured
    if (process.env.SMTP_HOST) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      });
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: process.env.SMTP_USER,
        subject: `Contact from ${name}: ${subject}`,
        text: `${message}

From: ${name} <${email}>`
      });
    }
    console.log('Contact form', { name, email, subject, message });
    res.json({ message: 'Received' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
