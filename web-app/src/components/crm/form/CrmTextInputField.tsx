import { useEffect, useRef, useState } from 'react';
import * as yup from 'yup';

const defaultSchema = yup.string();

type Props = {
    validation?: yup.AnySchema;
    onChange: (e: any) => void;
    value: string;
    label: string;
    placeholder: string;
    name: string;
    autoComplete?: string;
    type?: string;
    disabled?: boolean;
    className?: string;
    maxLength?: number;
    onError?: (e: any, ref: any) => void;
};

export default function CrmTextInputField({
    validation = defaultSchema,
    onChange,
    value,
    label,
    placeholder,
    name,
    autoComplete = 'off',
    type = 'text',
    disabled = false,
    className = '',
    maxLength = 255,
    onError = () => {},
}: Props) {
    const [error, setError] = useState(null);

    const ref = useRef(null);

    const validate = async (value: string) => {
        try {
            await validation.validate(value);
            setError(null);
            onError(null, ref.current);
        } catch (e: any) {
            setError(e.message);
            onError(e, ref.current);
        }
    };

    return (
        <div className={`w-full space-y-2 ${className}`}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 my-2">
                {label}
            </label>
            <input
                onChange={(e) => {
                    onChange(e);
                    validate(e.target.value);
                }}
                value={value ? value : type === 'number' ? 0 : ''}
                min={0}
                disabled={disabled}
                type={type}
                maxLength={maxLength}
                autoComplete={autoComplete}
                id={name}
                name={name}
                ref={ref}
                placeholder={placeholder}
                className={`shadow-sm p-4 px-6 border block w-full sm:text-sm border-gray-300 rounded-md focus:outline-none disabled:bg-platinum ${
                    error ? 'border-red-400 focus:ring-red-500' : 'focus:ring-primary-600 focus:border-primary-600'
                }`}
                // "bg-gray-50 disabled:bg-platinum border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
    );
}
