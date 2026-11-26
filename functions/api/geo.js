/**
 * Diagnostic endpoint returning the detected country code and resolved language.
 * Useful for verifying GeoIP language routing after deploying to Cloudflare Pages.
 */

const CHINESE_COUNTRIES = new Set(['CN', 'HK']);

function resolveLanguageFromCountry(countryCode) {
    const country = (countryCode || '').trim().toUpperCase();
    if (country === 'VN') return 'vi';
    if (CHINESE_COUNTRIES.has(country)) return 'zh';
    return 'en';
}

export function onRequestGet(context) {
    const country = (
        context.request.cf?.country ||
        context.request.headers.get('CF-IPCountry') ||
        ''
    ).trim().toUpperCase();

    const language = resolveLanguageFromCountry(country);

    return new Response(
        JSON.stringify({
            country: country || null,
            language,
        }),
        {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Cache-Control': 'no-store',
            },
        }
    );
}
