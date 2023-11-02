import { getUserConsent } from './consentManager';

declare global {
    interface Window {
        gtag: any;
    }
}

export default function sendEvent(action: string, params: any) {
    try {
        if (typeof window === 'undefined') return;

        if (getUserConsent()) {
            window.gtag('event', action, params);
        }
    } catch (error) {
        console.error(error);
    }
}
