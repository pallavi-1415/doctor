const nodemailer = require('nodemailer');

// --- EMAIL CONFIGURATION ---
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
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
                        <a href="https://doctor-booking-one.vercel.app" style="background-color: #0f172a; color: #fff; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Access Your Portal</a>
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
        res.status(200).json({ success: true, message: 'Registration email sent successfully' });
    } catch (error) {
        console.error('Error sending registration email:', error);
        res.status(500).json({ success: false, message: 'Failed to send registration email', error: error.message });
    }
};
