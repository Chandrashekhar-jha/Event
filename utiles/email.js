const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

// Create Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Booking Confirmation Email
const sendBookingEmail = async (userEmail, userName, eventTitle) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: `Booking Confirmed: ${eventTitle}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
                    <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 10px;">
                        
                        <h2 style="color: #4CAF50; text-align: center;">
                            Booking Confirmed 🎉
                        </h2>

                        <p>Hi <strong>${userName}</strong>,</p>

                        <p>
                            Your booking for the event 
                            <strong>${eventTitle}</strong> 
                            has been successfully confirmed.
                        </p>

                        <p>
                            Thank you for choosing 
                            <strong>Eventora</strong>.
                        </p>

                        <hr style="margin: 20px 0;" />

                        <p style="font-size: 14px; color: gray; text-align: center;">
                            Eventora Team
                        </p>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);

        console.log('Booking email sent successfully to:', userEmail);

    } catch (error) {
        console.error('Error sending booking email:', error);
    }
};

// OTP Email Function
exports.sendOtpEmail = async (email, otp, type) => {
    try {

        const title =
            type === 'account_verification'
                ? 'Verify Your Eventora Account'
                : 'Eventora Booking Verification';

        const msg =
            type === 'account_verification'
                ? 'Please use the following OTP to verify your new Eventora account.'
                : 'Please use the following OTP to verify and confirm your booking.';

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: title,

            html: `
                <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                    
                    <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 10px; text-align: center;">
                        
                        <h2 style="color: #333;">
                            Eventora OTP Verification
                        </h2>

                        <p style="font-size: 16px; color: #555;">
                            ${msg}
                        </p>

                        <div style="
                            margin: 30px auto;
                            background-color: #4CAF50;
                            color: white;
                            font-size: 32px;
                            font-weight: bold;
                            letter-spacing: 5px;
                            padding: 15px 30px;
                            width: fit-content;
                            border-radius: 8px;
                        ">
                            ${otp}
                        </div>

                        <p style="color: #777; font-size: 14px;">
                            This OTP is valid for 10 minutes.
                        </p>

                        <hr style="margin: 20px 0;" />

                        <p style="font-size: 13px; color: gray;">
                            If you did not request this, please ignore this email.
                        </p>

                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);

        console.log(`OTP email sent to ${email} for ${type}`);

    } catch (error) {
        console.error(`Error sending OTP email to ${email} for ${type}:`, error);
    }
};

// Export Booking Email Function
exports.sendBookingEmail = sendBookingEmail;