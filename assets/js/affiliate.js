// First-visit affiliate redirect with 30-day expiry
(() => {
    const AFF_URL = 'https://vn.tradingview.com/?aff_id=122256';
    const STORAGE_KEY = 'tv_aff_last_redirect';
    const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

    const getLastRedirect = () => {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch {
            return null;
        }
    };

    const setLastRedirect = (timestamp) => {
        try {
            localStorage.setItem(STORAGE_KEY, String(timestamp));
        } catch {
            // Ignore storage errors in restricted browsing modes
        }
    };

    const shouldRedirect = () => {
        const lastRedirect = getLastRedirect();
        if (!lastRedirect) return true;

        const parsed = Number(lastRedirect);
        if (Number.isNaN(parsed)) return true;

        return (Date.now() - parsed) > THIRTY_DAYS_MS;
    };

    if (!shouldRedirect()) return;

    const handleFirstClick = (event) => {
        // Ignore non-primary clicks or modifier-key clicks (e.g. Cmd/Ctrl+click)
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
            return;
        }

        const target = event.target instanceof Element ? event.target : null;
        if (!target) return;

        // Avoid interrupting native dropdown interactions
        if (target.closest('select, option')) {
            return;
        }

        if (!shouldRedirect()) {
            document.removeEventListener('click', handleFirstClick, true);
            return;
        }

        const anchor = target.closest('a[href]');
        const rawHref = anchor ? anchor.getAttribute('href') : '';

        // If user directly clicked the affiliate link, just record timestamp and let it open naturally
        if (anchor && anchor.href && anchor.href.includes('aff_id=122256')) {
            setLastRedirect(Date.now());
            document.removeEventListener('click', handleFirstClick, true);
            return;
        }

        const isNavigableLink = Boolean(
            anchor &&
            anchor.href &&
            rawHref &&
            !rawHref.startsWith('javascript:') &&
            !rawHref.startsWith('mailto:') &&
            !rawHref.startsWith('tel:')
        );

        const urlToOpenInNewTab = isNavigableLink ? anchor.href : window.location.href;

        // Open destination in a new tab within the synchronous click gesture
        const newTab = window.open(urlToOpenInNewTab, '_blank');
        if (!newTab) {
            // Popup was blocked; leave normal navigation intact
            return;
        }

        if (isNavigableLink) {
            event.preventDefault();
        }

        setLastRedirect(Date.now());
        document.removeEventListener('click', handleFirstClick, true);

        // Redirect current tab to the affiliate URL
        window.location.href = AFF_URL;
    };

    document.addEventListener('click', handleFirstClick, true);
})();
