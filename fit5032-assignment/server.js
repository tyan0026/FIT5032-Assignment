import express from 'express';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import cors from 'cors'; 
import fs from 'fs';
import { fileURLToPath } from 'url';
import {dirname, join} from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Define a route to handle email sending
app.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;

  const pdfPath = join(__dirname, 'files/Policy.pdf')
  const pdfFile = fs.readFileSync(pdfPath).toString('base64')

  const msg = {
    to,
    from: 'yangtianning937@gmail.com', // verified SendGrid sender email
    subject,
    text,
    attachments:[
      {
        content:pdfFile,
        filename:'our policy.pdf',
        type:'application/pdf',
        desposition:'attachment'
      }
    ]
  };

  // Set SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  sgMail
    .send(msg)
    .then(() => res.status(200).json({ message: 'Email sent successfully!' }))
    .catch((error) => res.status(500).json({ error: error.message }));
});



// API endpoint to get all users
app.get('/users', async (req, res) => {
  try {
    let users = [];
    let listUsersResult = await admin.auth().listUsers();
    listUsersResult.users.forEach((userRecord) => {
      users.push({
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
      });
    });
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
