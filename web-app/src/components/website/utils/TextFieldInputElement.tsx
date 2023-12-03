import { useState } from 'react';
import * as yup from 'yup';

type TextFieldInputElementProps = {
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: any, error: string | null) => void;
    className?: string;
    id?: string;
    rows?: number;
    validation?: yup.StringSchema;
};

export default function TextFieldInputElement({
    name,
    placeholder,
    value,
    onChange,
    className,
    id,
    validation,
    rows = 5,
}: TextFieldInputElementProps) {
    const [error, setError] = useState<string>('');

    const validate = (e: any) => {
        if (validation) {
            try {
                validation.validateSync(e.target.value);
                setError('');
                onChange(e, null);
            } catch (err: Error | any) {
                setError(err.message);
                onChange(e, err.message);
            }
        }
    };

    return (
        <div className="flex flex-col justify-start w-full space-y-2">
            <textarea
                name={name}
                id={id}
                rows={rows}
                placeholder={placeholder}
                value={value}
                onChange={validate}
                className={`bg-white bg-opacity-80 border-2 resize-none border-semi-white p-4 rounded-lg text-sm text-header-bg text-left focus:outline-none focus:bg-opacity-100 transition ${className}`}
            />
            {error && <p className="text-red-500 text-xs font-light">{error}</p>}
        </div>
    );
}
