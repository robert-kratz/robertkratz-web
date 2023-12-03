type CrmPageHeadingProps = {
    title: string;
};

export default function CrmPageHeading({ title }: CrmPageHeadingProps) {
    return (
        <div className="w-full py-2 border-b mb-2">
            <h1 className="text-xl font-light">{title}</h1>
        </div>
    );
}
