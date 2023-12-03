import bcrypt from 'bcrypt';
import { passwordStrength } from 'check-password-strength';

const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

const comparePassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
};

const checkPasswordStrength = (password: string) => {
    return passwordStrength(password);
};

export default {
    hashPassword,
    comparePassword,
    checkPasswordStrength,
};
