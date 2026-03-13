"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface NavigationSection {
    id: string;
    label: string;
}

interface PageNavigationContextType {
    sections: NavigationSection[];
    setSections: (sections: NavigationSection[]) => void;
}

const PageNavigationContext = createContext<PageNavigationContextType>({
    sections: [],
    setSections: () => {},
});

export function PageNavigationProvider({ children }: { children: ReactNode }) {
    const [sections, setSections] = useState<NavigationSection[]>([]);

    return (
        <PageNavigationContext.Provider value={{ sections, setSections }}>{children}</PageNavigationContext.Provider>
    );
}

export function usePageNavigation() {
    return useContext(PageNavigationContext);
}
