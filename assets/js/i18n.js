(() => {
    const supportedLanguages = ['vi', 'en', 'fr', 'zh'];
    const selector = document.querySelector('#language-select');
    if (!selector) return;

    // Storage can be unavailable in private browsing or embedded previews.
    const readPreference = () => {
        try {
            return localStorage.getItem('preferred_language');
        } catch {
            return null;
        }
    };

    const applyLanguage = (language) => {
        const dictionary = translations[language] || translations.vi;
        document.documentElement.lang = language;
        document.querySelectorAll('[data-i18n]').forEach((element) => {
            const text = dictionary[element.dataset.i18n];
            if (text !== undefined) element.textContent = text;
        });
        // HTML values are trusted markup from the bundled translation dictionary.
        document.querySelectorAll('[data-i18n-html]').forEach((element) => {
            const markup = dictionary[element.dataset.i18nHtml];
            if (markup !== undefined) element.innerHTML = markup;
        });
        document.querySelector('.menu-toggle')?.setAttribute('aria-label', dictionary.menu_label);
        selector.value = language;
    };

    const readQueryLanguage = () => {
        try {
            const lang = new URLSearchParams(window.location.search).get('lang');
            return lang ? lang.toLowerCase() : null;
        } catch {
            return null;
        }
    };

    const readGeoLanguage = () => {
        const lang = document.documentElement.dataset.geoLang;
        return lang ? lang.toLowerCase() : null;
    };

    const resolveFallbackLanguage = () => {
        const browserLanguage = (navigator.language || '').slice(0, 2).toLowerCase();
        if (browserLanguage === 'vi') return 'vi';
        if (browserLanguage === 'zh') return 'zh';
        return 'en';
    };

    const queryLanguage = readQueryLanguage();
    const preferred = readPreference();
    const geoLanguage = readGeoLanguage();

    // Priority: URL ?lang -> saved manual preference -> Cloudflare GeoIP -> browser fallback
    const activeLanguage =
        supportedLanguages.includes(queryLanguage) ? queryLanguage :
        supportedLanguages.includes(preferred) ? preferred :
        supportedLanguages.includes(geoLanguage) ? geoLanguage :
        resolveFallbackLanguage();

    applyLanguage(activeLanguage);

    selector.addEventListener('change', () => {
        const language = selector.value;
        if (!supportedLanguages.includes(language)) return;
        try {
            localStorage.setItem('preferred_language', language);
        } catch {
            // The current-page language switch still works without storage.
        }
        applyLanguage(language);
    });
})();
