type Props = {
    className?: string;
    color?: string;
    children?: React.ReactNode;
};

export default function CrmPageTopAlert({ className, color, children }: Props) {
    return (
        <div id="page-alert" className="w-full min-h-full top-0 z-50">
            <div className={`flex justify-center font-light p-3 text-center ${color ? color : 'bg-red-400'}`}>
                <p className={className}>{children}</p>
            </div>
        </div>
    );
}
