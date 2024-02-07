import sgMail from '@sendgrid/mail';

export interface ISendEmail{
    to: string
    subject: string
    text: string
}

export async function sendEmail({to, subject, text}: ISendEmail) {
    const secretKey = process.env.SENDGRID_API_KEY as string
    const from = process.env.SENDGRID_SENDER_EMAIL as string

    sgMail.setApiKey(secretKey);

    const msg = {
        to,
        from,
        subject,
        text,
    };

    await sgMail.send(msg);

    return {message: 'Email sent successfully'}
}