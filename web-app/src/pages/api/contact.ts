import axios from 'axios';
import getConfig from 'next/config';
import * as yup from 'yup';
import sendgrid from '@sendgrid/mail';

const { serverRuntimeConfig } = getConfig();

const { RECAPTCHA_SECRET_KEY, SENDGRID_API_KEY, CONTACT_EMAIL, CONTACT_NAME, EMAIL_TEMPLATES } = serverRuntimeConfig;

sendgrid.setApiKey(SENDGRID_API_KEY);

const validationSchema = {
    firstName: yup.string().required('Bitte geben Sie Ihren Vornamen an'),
    lastName: yup.string().required('Bitte geben Sie Ihren Nachnamen an'),
    email: yup
        .string()
        .email('Bitte geben Sie eine gültige E-Mail Adresse an')
        .required('Bitte geben Sie Ihre E-Mail Adresse an'),
    message: yup
        .string()
        .min(1, 'Ihre Nachricht muss mindestens 1 Zeichen lang sein')
        .max(4096, 'Ihre Nachricht darf nicht länger als 4096 Zeichen sein')
        .required('Bitte geben Sie eine Nachricht an'),
    phone: yup.string().matches(/^\+?[0-9\s]+$/, 'Bitte geben Sie eine gültige Telefonnummer an'),
    recaptchaResponse: yup.string().required('Bitte bestätigen Sie, dass Sie kein Roboter sind'),
    local: yup.string(),
};

export default async (req: any, res: any) => {
    if (req.method === 'POST') {
        const { locale } = req.query;

        try {
            await yup.object().shape(validationSchema).validate(req.body);
        } catch (error: Error | any) {
            console.log(error);

            return res.status(400).send(error.message);
        }

        const { recaptchaResponse } = req.body;

        // Verify reCAPTCHA
        const verification = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
            params: {
                secret: RECAPTCHA_SECRET_KEY,
                response: recaptchaResponse,
            },
        });

        const verificationBody = verification.data;

        if (verificationBody.success) {
            // Handle your form submission here

            let templateIdCustomer = EMAIL_TEMPLATES.customer_contact[req.body.locale];
            let templateIdAdmin = EMAIL_TEMPLATES?.admin_contact['default'];

            if (!templateIdCustomer) templateIdCustomer = EMAIL_TEMPLATES.customer_contact['default'];
            if (!templateIdAdmin) templateIdAdmin = EMAIL_TEMPLATES.admin_contact['default'];

            let userData = {
                ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                userAgent: req.headers['user-agent'],
                date: new Date().toISOString(),
                name: req.body.firstName + ' ' + req.body.lastName,
                email_set_to: req.body.email,
            };

            console.log(userData);

            await sendEmail(CONTACT_EMAIL, { ...req.body, ...userData, email_set_to: CONTACT_EMAIL }, templateIdAdmin);
            await sendEmail(req.body.email, { ...req.body, ...userData }, templateIdCustomer);

            res.status(200).send('Message sent successfully');
        } else {
            console.log('reCAPTCHA verification failed');

            res.status(400).send('reCAPTCHA verification failed');
        }
    } else {
        res.status(405).send('Method not allowed');
    }
};

async function sendEmail(to: string, dynamicTemplateData: object, templateId: string) {
    const msg = {
        to, // recipient email
        from: `${CONTACT_NAME} <${CONTACT_EMAIL}>`, // sender email
        templateId,
        dynamic_template_data: dynamicTemplateData,
    };

    try {
        await sendgrid.send(msg);
        console.log(`Email successfully sent to ${to} with template ${templateId}`);
    } catch (error: any) {
        console.error(error);
        if (error.response) {
            console.error(error.response.body);
        }
    }
}
