import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { SessionDocument } from '../../../../types/SessionDocument';
import { UserDocument } from '../../../../types/UserDocument';

type Props = {
    user: UserDocument;
};

export default function CrmHeader({ user }: Props) {
    const [dropDownOpen, setDropDownOpen] = useState<boolean>(false);

    return (
        <header className="w-full bg-header-bg shadow-md z-40 top-0 sticky">
            <div className="flex justify-between items-center p-4 px-4 md:px-8">
                <div>
                    <Link href={'/crm'}>
                        <Image
                            src="/images/logo/logo-header-invert.svg"
                            priority={true}
                            alt="Logo"
                            width={48}
                            height={48}
                        />
                    </Link>
                </div>
                <div
                    onMouseEnter={() => setDropDownOpen(true)}
                    onMouseLeave={() => setDropDownOpen(false)}
                    onClick={() => setDropDownOpen(!dropDownOpen)}
                    className="flex justify-end space-x-4 items-center p-2 hover:bg-white-smoke hover:bg-opacity-5 transition cursor-pointer rounded-md relative">
                    <div className="hidden md:block">
                        <p className="text-white font-light text-sm">{user.email}</p>
                    </div>
                    <div className="flex justify-center items-center h-12 w-12 bg-secondary-blue rounded-full">
                        <p className="text-white font-light">{user.name.charAt(0).toUpperCase()}</p>
                    </div>
                    {dropDownOpen && (
                        <div className="absolute top-16 right-0 w-40 md:w-full rounded-md shadow-md">
                            <div className="flex flex-col divide-y bg-white">
                                <Link
                                    href={'/crm/settings'}
                                    className="w-full p-4 text-sm hover:bg-rich-black hover:bg-opacity-10">
                                    <p>Settings</p>
                                </Link>
                                <Link
                                    href={'/api/crm/auth/logout'}
                                    className="w-full p-4 text-sm hover:bg-rich-black hover:bg-opacity-10">
                                    <p>Logout</p>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
