require('dotenv').config();
const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

const upload = multer({ dest: path.join(__dirname, 'tmp_uploads') });
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.post('/submit', upload.array('images', 3), async (req, res) => {
  const { name, email, message } = req.body;
  const files = req.files || [];

  // create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465, // true for 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const recipient = process.env.RECIPIENT;
  if (!recipient) {
    console.error('RECIPIENT not configured');
    return res.status(500).send('Recipient not configured');
  }

  const attachments = files.map(f => ({
    filename: f.originalname || path.basename(f.path),
    path: f.path
  }));

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: recipient,
    subject: `New model submission from ${name || 'Unknown'}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    attachments
  };

  try {
    await transporter.sendMail(mailOptions);

    // cleanup uploaded files
    attachments.forEach(a => {
      fs.unlink(a.path, () => {});
    });

    // redirect to thank you page
    res.redirect('/thankyou.html');
  } catch (err) {
    console.error('Error sending email', err);
    // cleanup uploaded files
    attachments.forEach(a => {
      fs.unlink(a.path, () => {});
    });
    res.status(500).send('Error sending email');
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));