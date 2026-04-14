const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'] as const;
const STORAGE_KEY = 'xerebo_utm';

export function captureUTMParams(): void {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const hasUTM = UTM_KEYS.some(key => params.has(key));
    if (!hasUTM) return;

    const utm: Record<string, string> = {};
    UTM_KEYS.forEach(key => {
        const value = params.get(key);
        if (value) utm[key] = value;
    });

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utm));
}

export function getUTMParams(): Record<string, string> {
    if (typeof window === 'undefined') return {};

    try {
        const stored = sessionStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
    } catch {
        return {};
    }
}
