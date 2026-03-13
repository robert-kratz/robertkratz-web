"use client";

import { useEffect } from "react";
import { usePageNavigation } from "@/components/layout/page-navigation-context";

interface Section {
    id: string;
    label: string;
}

export function SetPageSections({ sections }: { sections: Section[] }) {
    const { setSections } = usePageNavigation();

    useEffect(() => {
        setSections(sections);
        return () => setSections([]);
    }, [sections, setSections]);

    return null;
}
