import parsePhoneNumber from 'libphonenumber-js';

const SKIP_TYPES = ['CTA Form (Partial)', 'Competitor Unlock (Partial)', 'Competitor Scan', 'FAQ Question (Partial)'];

let cachedCountries: Record<string, string> | null = null;

async function fetchCRMCountries(baseUrl: string, apiKey: string, apiSecret: string): Promise<Record<string, string>> {
    if (cachedCountries) return cachedCountries;

    try {
        const res = await fetch(`${baseUrl}/api/method/frappe.client.get_list`, {
            method: 'POST',
            headers: {
                'Authorization': `token ${apiKey}:${apiSecret}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                doctype: 'Country',
                fields: ['name', 'code'],
                limit_page_length: 0,
            }),
        });

        if (res.ok) {
            const data = await res.json();
            const map: Record<string, string> = {};
            for (const c of data.message || []) {
                if (c.code) map[c.code.toUpperCase()] = c.name;
            }
            cachedCountries = map;
            return cachedCountries;
        }
    } catch (err) {
        console.error('Failed to fetch CRM countries:', err);
    }
    return {};
}

async function detectCountry(phone: string, baseUrl: string, apiKey: string, apiSecret: string): Promise<string | undefined> {
    if (!phone) return undefined;

    try {
        const parsed = parsePhoneNumber(phone);
        if (!parsed?.country) return undefined;

        const countries = await fetchCRMCountries(baseUrl, apiKey, apiSecret);
        return countries[parsed.country] || undefined;
    } catch {
        return undefined;
    }
}

let cachedSources: string[] | null = null;

async function fetchCRMSources(baseUrl: string, apiKey: string, apiSecret: string): Promise<string[]> {
    if (cachedSources) return cachedSources;

    try {
        const res = await fetch(`${baseUrl}/api/method/frappe.client.get_list`, {
            method: 'POST',
            headers: {
                'Authorization': `token ${apiKey}:${apiSecret}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                doctype: 'CRM Lead Source',
                fields: ['name'],
                limit_page_length: 100,
            }),
        });

        if (res.ok) {
            const data = await res.json();
            cachedSources = (data.message || []).map((s: { name: string }) => s.name);
            return cachedSources!;
        }
    } catch (err) {
        console.error('Failed to fetch CRM sources:', err);
    }
    return [];
}

async function detectSource(utmSource: string | undefined, baseUrl: string, apiKey: string, apiSecret: string): Promise<string> {
    if (!utmSource) return 'Website';

    const sources = await fetchCRMSources(baseUrl, apiKey, apiSecret);
    const lower = utmSource.toLowerCase();

    // Exact match (case-insensitive)
    const exact = sources.find(s => s.toLowerCase() === lower);
    if (exact) return exact;

    // Partial match (e.g. "fb" matches "Facebook", "ig" matches "Instagram")
    const partial = sources.find(s => s.toLowerCase().startsWith(lower) || lower.startsWith(s.toLowerCase()));
    if (partial) return partial;

    return 'Website';
}

function cleanBudget(budget: string): string | undefined {
    if (!budget) return undefined;
    return budget.replace(/[^\x20-\x7E]/g, '-');
}

export async function createFrappeLead(body: Record<string, any>): Promise<{ success: boolean; error?: string }> {
    const { FRAPPE_URL, FRAPPE_API_KEY, FRAPPE_API_SECRET } = process.env;
    if (!FRAPPE_URL || !FRAPPE_API_KEY || !FRAPPE_API_SECRET) {
        console.error('Frappe CRM credentials not configured');
        return { success: false, error: 'Missing CRM credentials' };
    }
    if (SKIP_TYPES.includes(body.formType)) return { success: true };

    const firstName = body.firstName || body.name?.split(' ')[0] || 'Unknown';
    const lastName = body.lastName || body.name?.split(' ').slice(1).join(' ') || '';
    const phone = body.phone || body.mobile || '';
    const country = await detectCountry(phone, FRAPPE_URL, FRAPPE_API_KEY, FRAPPE_API_SECRET);
    const adBudget = cleanBudget(body.budget);

    const notes = [
        body.formType && `Form: ${body.formType}`,
        body.budget && `Budget: ${body.budget.replace(/[^\x20-\x7E]/g, '-')}`,
        body.selectedPackage && `Package: ${body.selectedPackage}`,
        body.competitorUrl && `Competitor URL: ${body.competitorUrl}`,
        body.question && `Question: ${body.question}`,
        body.relatedTo && `Related To: ${body.relatedTo}`,
    ].filter(Boolean).join(' | ');

    const leadData = {
        first_name: firstName,
        last_name: lastName,
        email: body.email,
        mobile_no: phone,
        source: await detectSource(body.utm_source, FRAPPE_URL, FRAPPE_API_KEY, FRAPPE_API_SECRET),
        ...(country && { custom_country: country }),
        ...(adBudget && { custom_ad_budget: adBudget }),
        ...(body.competitorUrl ? { website: body.competitorUrl } : body.pageUrl ? { website: body.pageUrl } : {}),
        ...(body.utm_source && { custom_platform: body.utm_source }),
        ...(body.utm_medium && { custom_form_name: body.utm_medium }),
        ...(body.utm_campaign && { custom_campaign: body.utm_campaign }),
        ...(body.utm_term && { custom_adset: body.utm_term }),
        ...(body.utm_content && { custom_ad: body.utm_content }),
        ...(body.gclid && { custom_lead_id: body.gclid }),
        ...(body.fbclid && { custom_lead_id: body.fbclid }),
        ...(body.selectedPackage && { custom_button_name: body.selectedPackage }),
        ...(notes && { custom_client_profile_and_requirement: notes }),
    };

    const res = await fetch(`${FRAPPE_URL}/api/resource/CRM Lead`, {
        method: 'POST',
        headers: {
            'Authorization': `token ${FRAPPE_API_KEY}:${FRAPPE_API_SECRET}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
    });

    if (!res.ok) {
        const text = await res.text();
        console.error('Frappe Lead creation failed:', res.status, text);
        return { success: false, error: `CRM responded with ${res.status}` };
    }

    return { success: true };
}
