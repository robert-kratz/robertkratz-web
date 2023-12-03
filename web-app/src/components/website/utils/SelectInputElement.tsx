import { useState } from 'react';
import * as yup from 'yup';

type SelectInputElementProps = {
    name: string;
    placeholder: string;
    value: boolean;
    onChange: (e: any, error: string | null) => void;
    className?: string;
    id?: string;
    validation?: yup.StringSchema;
    childern?: React.ReactNode;
};

export default function SelectInputElement({
    name,
    placeholder,
    value,
    onChange,
    className,
    id,
    validation,
    childern,
}: SelectInputElementProps) {
    const [error, setError] = useState<string>('');

    const validate = (e: any) => {
        if (validation) {
            try {
                validation.validateSync(e.target.checked);
                setError('');
                onChange(e, null);
            } catch (err: Error | any) {
                setError(err.message);
                onChange(e, err.message);
            }
        }
    };

    return (
        <div className="flex flex-col justify-start w-full">
            <div className="flex justify-start space-x-4">
                <input
                    type="checkbox"
                    name={name}
                    id={id}
                    placeholder={placeholder}
                    checked={value}
                    onChange={validate}
                    className={
                        'p-4 rounded-lg text-sm text-header-bg text-left focus:outline-none focus:bg-opacity-100 transition'
                    }
                />
                {childern}
            </div>
            {error && <p className="text-red-500 text-xs font-light">{error}</p>}
        </div>
    );
}
