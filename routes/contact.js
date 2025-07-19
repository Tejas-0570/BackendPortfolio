// backend/routes/contact.js
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
require('dotenv').config(); // load .env variables

router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // use EMAIL_USER from .env
                pass: process.env.EMAIL_PASS,

            }
        });

        const mailOptions = {
            from: email,
            to: 'tejaswaydande00@gmail.com', // recipient email from .env
            subject: `Portfolio Contact from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`
        };

        await transporter.sendMail({
            from: req.body.email,
            to: process.env.MAIL_RECEIVER,
            subject: `Portfolio Contact from ${req.body.name}`,
            replyTo: req.body.email, // 👈 add this
            html: `
    <p><strong>Name:</strong> ${req.body.name}</p>
    <p><strong>Email:</strong> <a href="mailto:${req.body.email}">${req.body.email}</a></p>
    <p><strong>Message:</strong><br/>${req.body.message}</p>
  `,
        });
        res.status(200).json({ message: 'Message sent successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Email sending failed' });
    }
});

module.exports = router;
