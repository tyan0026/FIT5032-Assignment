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

app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    const pdfPath = join(__dirname, 'files/Policy.pdf');
    
    // Check if the file exists
    if (!fs.existsSync(pdfPath)) {
      return res.status(404).json({ error: 'PDF file not found.' });
    }

    const pdfFile = fs.readFileSync(pdfPath).toString('base64');

    const msg = {
      to,
      from: 'yangtianning937@gmail.com', // Verified SendGrid sender email
      subject,
      text,
      attachments: [
        {
          content: pdfFile,
          filename: 'our policy.pdf',
          type: 'application/pdf',
          disposition: 'attachment', // Corrected spelling: 'disposition'
        },
      ],
    };

    // Set SendGrid API Key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // Attempt to send the email
    await sgMail.send(msg);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    // Log the error details for easier debugging
    console.error('SendGrid Error:', error);

    // Check if it's a SendGrid-specific error
    if (error.response) {
      console.error('SendGrid Response:', error.response.body);
    }

    res.status(500).json({
      error: 'Failed to send email.',
      details: error.message, // Send brief details in response
    });
  }
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
