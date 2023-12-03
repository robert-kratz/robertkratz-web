import * as yup from 'yup';

export function handleUserLoginValidation(body: any) {
    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required(),
    });

    return schema.validateSync(body);
}

export function handleTwoFactorValidation(body: any) {
    const schema = yup.object().shape({
        code: yup.string().required(),
    });

    return schema.validateSync(body);
}

export function handleUserSignUpValidation(body: any) {
    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required(),
        name: yup.string().required(),
    });

    return schema.validateSync(body);
}

export function handleTwoFactorToggleValidation(body: any) {
    const schema = yup.object().shape({
        enabled: yup.boolean().required(),
        code: yup.string().required(),
    });

    return schema.validateSync(body);
}
