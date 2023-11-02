// consentManager.js

export function getUserConsent() {
    if (typeof window === 'undefined') return;

    if (document.cookie.includes('user-consent=accept')) return true;
    if (document.cookie.includes('user-consent=decline')) return false;

    return null;
}

export function setUserConsent(value: 'accept' | 'decline' | null) {
    if (typeof window === 'undefined') return;

    document.cookie = `user-consent=${value}; path=/`;
}

export function showCookieDialog() {
    if (typeof window === 'undefined') return false;

    if (document.cookie.includes('user-consent=accept')) return true;
    if (document.cookie.includes('user-consent=decline')) return false;

    return null;
}
