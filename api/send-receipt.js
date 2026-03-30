const nodemailer = require('nodemailer');

// --- EMAIL CONFIGURATION ---
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'pallaviramoliya1415@gmail.com',
        pass: process.env.EMAIL_PASS || 'sjlweeafxlddsvmh'
    }
});

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

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
        res.status(200).json({ success: true, message: 'Receipt email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Failed to send receipt email', error: error.message });
    }
};
