/**
 * Cloudflare Pages Middleware: detect visitor country from IP and inject
 * the default language into the HTML root element before sending to client.
 *
 * Mapping rules:
 * - VN -> vi (Vietnamese)
 * - CN, HK -> zh (Chinese)
 * - All other countries -> en (English)
 */

const CHINESE_COUNTRIES = new Set(['CN', 'HK']);

function resolveLanguageFromCountry(countryCode) {
    const country = (countryCode || '').trim().toUpperCase();
    if (country === 'VN') return 'vi';
    if (CHINESE_COUNTRIES.has(country)) return 'zh';
    return 'en';
}

export async function onRequest(context) {
    const response = await context.next();
    const contentType = response.headers.get('content-type') || '';

    // Only rewrite HTML documents; leave static assets (CSS/JS/images/fonts) untouched.
    if (!contentType.includes('text/html')) {
        return response;
    }

    const country = (
        context.request.cf?.country ||
        context.request.headers.get('CF-IPCountry') ||
        ''
    ).trim().toUpperCase();

    const geoLanguage = resolveLanguageFromCountry(country);

    const rewritten = new HTMLRewriter()
        .on('html', {
            element(el) {
                el.setAttribute('data-geo-lang', geoLanguage);
                if (country) {
                    el.setAttribute('data-geo-country', country);
                }
            },
        })
        .transform(response);

    const headers = new Headers(rewritten.headers);
    // Prevent shared caches from serving one country's geo attributes to another.
    headers.set('Cache-Control', 'private, no-cache');
    headers.set('Vary', 'CF-IPCountry');

    return new Response(rewritten.body, {
        status: rewritten.status,
        statusText: rewritten.statusText,
        headers,
    });
}
