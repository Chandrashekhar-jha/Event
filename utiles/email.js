const nodemailer = required('nodemailer')
const dotenv = require('dotenv')

dotenv.config()

const transporter =  nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMIAL_USER,
        user: process.env.EMIAL_PASS
    }
})

exports.sendOtpEmail = async (email, otp, type) => {
    try{
        const mailOptions = {
        from: process.env.EMIAL_USER,
        to: email,
        subject: `Your OTP Code`,
        text: `Your OTP code is: ${otp}`
    }

    await transporter.sendMail(mailOptions)
    console.log(`OTP email sent to ${email} for ${type}`)
    }

    catch(error){
        console.error(`Error sending OTP email to ${email} for ${type}:`,error)
    }
}