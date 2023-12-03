type Props = {
    className?: string;
    color?: string;
    children?: React.ReactNode;
    onClick?: () => void;
};

export default function CrmActionButton({ className, color, children, onClick }: Props) {
    return (
        <button
            onClick={onClick}
            className={`flex justify-center px-6 py-4 md:px-4 md:py-3 text-sm rounded shadow-md transition font-medium text-center ${
                color ? color : 'bg-red-400 text-white'
            }`}>
            {children}
        </button>
    );
}
