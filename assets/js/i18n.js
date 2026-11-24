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

    const preferred = readPreference();
    const browserLanguage = (navigator.language || 'vi').slice(0, 2).toLowerCase();
    const activeLanguage = supportedLanguages.includes(preferred) ? preferred :
        supportedLanguages.includes(browserLanguage) ? browserLanguage : 'vi';
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
