import nodemailer from 'nodemailer'

export const sendEmail = async options => {

    var transport = {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    }

    const transporter = nodemailer.createTransport(transport)
    const messageInfo = {
        from: `${process.env.SMTP_FROM_NAME}<${process.env.SMTP_FROM_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        html: `<p>${options.message.replace(/\n/g, '<br>')}</p>`
    }
    await transporter.sendMail(messageInfo)
}
