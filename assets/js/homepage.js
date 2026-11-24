(() => {
    const menuButton = document.querySelector('.menu-toggle');
    const navigation = document.querySelector('#navigation');

    const closeMenu = () => {
        menuButton.setAttribute('aria-expanded', 'false');
        navigation.classList.remove('is-open');
    };

    menuButton.addEventListener('click', () => {
        const isOpen = menuButton.getAttribute('aria-expanded') !== 'true';
        menuButton.setAttribute('aria-expanded', String(isOpen));
        navigation.classList.toggle('is-open', isOpen);
    });

    navigation.addEventListener('click', (event) => {
        if (event.target.closest('a')) closeMenu();
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.navbar')) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
            closeMenu();
            menuButton.focus();
        }
    });

    const desktopLayout = window.matchMedia('(min-width: 768px)');
    desktopLayout.addEventListener('change', () => {
        if (desktopLayout.matches) closeMenu();
    });

    const articlesButton = document.querySelector('.all-articles');
    const moreArticles = document.querySelector('#more-articles');
    articlesButton.addEventListener('click', () => {
        const isOpen = articlesButton.getAttribute('aria-expanded') !== 'true';
        articlesButton.setAttribute('aria-expanded', String(isOpen));
        moreArticles.hidden = !isOpen;
    });
})();
