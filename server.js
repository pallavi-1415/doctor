const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// --- EMAIL CONFIGURATION ---
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pallaviramoliya1415@gmail.com',
        pass: 'sjlweeafxlddsvmh'
    }
});

// Endpoint to send the receipt
app.post('/api/send-receipt', async (req, res) => {
    const { email, patientName, doctorName, date, slot, amount } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const mailOptions = {
        from: '"Aura Medical App" <pallaviramoliya1415@gmail.com>',
        to: email,
        subject: 'Payment Receipt: Clinic Session Confirmed',
        html: `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h2 style="color: #0d9488; margin: 0;">Aura Medical</h2>
                    <p style="color: #666; font-size: 14px; margin-top: 5px;">Quiet Luxury Healthcare</p>
                </div>
                
                <div style="background-color: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                    <h3 style="color: #0f172a; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 0;">Payment Successful</h3>
                    <p>Dear <strong>${patientName}</strong>,</p>
                    <p>Thank you for choosing Aura Medical. Your payment has been successfully processed, and your clinical session is confirmed.</p>
                    
                    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Physician:</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; text-align: right;">${doctorName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Date:</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; text-align: right;">${date}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Time Slot:</td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; text-align: right;">${slot}</td>
                        </tr>
                        <tr>
                            <td style="padding: 15px 0 5px 0; color: #666;">Total Paid:</td>
                            <td style="padding: 15px 0 5px 0; font-size: 18px; font-weight: bold; color: #0d9488; text-align: right;">${amount}</td>
                        </tr>
                    </table>
                </div>

                <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
                    <p>&copy; ${new Date().getFullYear()} Aura Medical Group. All rights reserved.</p>
                    <p>For support, please contact concierge@aura.com or +1 (800) AURA-MED.</p>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Receipt successfully sent to: ${email}`);
        res.status(200).json({ success: true, message: 'Receipt email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send receipt email', error: error.message });
    }
});

// Endpoint to send the registration welcome email
app.post('/api/send-registration', async (req, res) => {
    const { email, name } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const mailOptions = {
        from: '"Aura Medical App" <pallaviramoliya1415@gmail.com>',
        to: email,
        subject: 'Welcome to Aura Medical | Your Healthcare Journey Begins',
        html: `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h2 style="color: #0d9488; margin: 0;">AURA MEDICAL</h2>
                    <p style="color: #666; font-size: 14px; margin-top: 5px;">Quiet Luxury Healthcare</p>
                </div>
                
                <div style="background-color: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                    <h3 style="color: #0f172a; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-top: 0;">Registration Successful</h3>
                    <p>Dear <strong>${name}</strong>,</p>
                    <p>Welcome to Aura Medical. Your account has been successfully created, and you now have access to our exclusive network of elite practitioners.</p>
                    
                    <p style="margin-top: 20px;">You can now:</p>
                    <ul>
                        <li>Browse our directory of top medical faculty.</li>
                        <li>Book private clinical sessions.</li>
                        <li>Access your secure clinical vault for records.</li>
                    </ul>
                    
                    <div style="text-align: center; margin-top: 30px;">
                        <a href="http://localhost:5500" style="background-color: #0f172a; color: #fff; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Access Your Portal</a>
                    </div>
                </div>

                <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
                    <p>&copy; ${new Date().getFullYear()} Aura Medical Group. All rights reserved.</p>
                    <p>For immediate assistance, please contact your care director at concierge@aura.com.</p>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Welcome email sent to: ${email}`);
        res.status(200).json({ success: true, message: 'Registration email sent successfully' });
    } catch (error) {
        console.error('Error sending registration email:', error);
        res.status(500).json({ success: false, message: 'Failed to send registration email', error: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    np
    console.log(`=================================`);
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Server is READY to send emails!');
    console.log(`=================================`);
});
