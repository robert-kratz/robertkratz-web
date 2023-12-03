import crypto from 'crypto';
import axios from 'axios';
import { v4 } from 'uuid';

const secret = crypto
    .createHash('sha256')
    .update(process.env.TWO_FACTOR_SECRET as string)
    .digest();

const generateSecretKey = () => {
    return `${v4()}-${v4()}-${v4()}}`;
};

const encrypt = (text: string) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-ctr', secret, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return { encrypted, iv: iv.toString('hex') };
};

const decrypt = (encryptedText: string, iv: string) => {
    try {
        console.log(encryptedText, iv);
        const decipher = crypto.createDecipheriv('aes-256-ctr', secret, Buffer.from(iv, 'hex'));
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const generateQRCode = (name: string, secret: string) => {
    return new Promise((resolve, rejects) => {
        axios.get(registerURL(name, secret)).then((response) => {
            if (response.status == 200) {
                try {
                    return resolve(response.data.split('><')[1].split("'")[1]);
                } catch (error) {
                    return rejects(error);
                }
            }
            return rejects();
        });
    });
};

const validateCode = (code: string, secret: string) => {
    return new Promise((resolve, rejects) => {
        axios.get(validateURL(code, secret)).then((response) => {
            if (response.status == 200) {
                if (response.data == 'True') return resolve(true);
            }
            return rejects();
        });
    });
};

const registerURL = (name: string, secret: string) => {
    return `https://www.authenticatorApi.com/pair.aspx?AppName=${encodeURIComponent(
        process.env.TWO_FACTOR_APP_NAME as string
    )}&AppInfo=${encodeURIComponent(name)}&SecretCode=${encodeURIComponent(secret)}`;
};

const validateURL = (code: string, secret: string) => {
    return `https://www.authenticatorApi.com/Validate.aspx?Pin=${encodeURIComponent(
        code
    )}&SecretCode=${encodeURIComponent(secret)}`;
};

export default {
    generateQRCode,
    validateCode,
    generateSecretKey,
    encrypt,
    decrypt,
};
