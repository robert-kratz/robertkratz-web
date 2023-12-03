type PageLayoutProps = {
    children: React.ReactNode;
    className?: string;
};

export default function LimitedWidthArea({ children, className }: PageLayoutProps) {
    return (
        <div className="flex justify-center items-center">
            <div className={className}>{children}</div>
        </div>
    );
}
