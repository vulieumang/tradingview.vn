document.addEventListener("DOMContentLoaded", () => {
    const supportedLanguages = ["vi", "en", "fr", "zh"];
    const languageNames = {
        vi: "Tiếng Việt",
        en: "English",
        fr: "Français",
        zh: "中文"
    };

    // Helper to get active language
    const getLanguage = () => {
        const stored = localStorage.getItem("preferred_language");
        if (stored && supportedLanguages.includes(stored)) {
            return stored;
        }
        
        // Auto detect from browser
        const browserLang = (navigator.language || navigator.userLanguage || "vi").substring(0, 2).toLowerCase();
        if (supportedLanguages.includes(browserLang)) {
            return browserLang;
        }
        return "vi"; // default fallback
    };

    // Apply translations by mapping CSS selectors
    const applyTranslations = (lang) => {
        document.documentElement.setAttribute("lang", lang);
        const d = translations[lang] || translations["vi"];
        
        // Navbar Links
        const navLinks = document.querySelectorAll(".nav-links a");
        if (navLinks.length >= 3) {
            navLinks[0].textContent = d.nav_pricing;
            navLinks[1].textContent = d.nav_blog;
            navLinks[2].textContent = d.nav_contact;
        }
        
        // Hero
        const badge = document.querySelector(".hero-text-content .badge");
        if (badge) badge.textContent = d.hero_badge;
        
        const title = document.querySelector(".hero-title");
        if (title) title.innerHTML = d.hero_title;
        
        const subtitle = document.querySelector(".hero-subtitle");
        if (subtitle) subtitle.textContent = d.hero_subtitle;
        
        const cta1 = document.querySelector(".hero-cta .btn-primary");
        if (cta1) cta1.textContent = d.hero_btn_pricing;
        
        const cta2 = document.querySelector(".hero-cta .btn-secondary");
        if (cta2) cta2.textContent = d.hero_btn_contact;
        
        // Stats
        const statLabels = document.querySelectorAll(".stats-banner .stat-label");
        if (statLabels.length >= 3) {
            statLabels[0].textContent = d.stat_clients;
            statLabels[1].textContent = d.stat_support;
            statLabels[2].textContent = d.stat_savings;
        }
        
        // Pricing Header
        const pricingTitle = document.querySelector("#pricing .section-title");
        if (pricingTitle) pricingTitle.textContent = d.pricing_title;
        const pricingSubtitle = document.querySelector("#pricing .section-subtitle");
        if (pricingSubtitle) pricingSubtitle.textContent = d.pricing_subtitle;
        
        // Essential Plan
        const p1 = document.querySelector(".pricing-card[data-plan='essential']");
        if (p1) {
            const featBadge = p1.querySelector(".featured-badge");
            if (featBadge) featBadge.textContent = d.plan_recommended;
            const planBadge = p1.querySelector(".plan-badge");
            if (planBadge) planBadge.textContent = d.plan_best;
            
            const labels = p1.querySelectorAll(".price-label");
            if (labels.length >= 2) {
                labels[0].textContent = d.label_official_price;
                labels[1].textContent = d.label_our_price;
            }
            
            const features = p1.querySelectorAll(".features .feature-item span");
            if (features.length >= 4) {
                features[0].textContent = d.essential_feat_1;
                features[1].textContent = d.essential_feat_2;
                features[2].textContent = d.essential_feat_3;
                features[3].textContent = d.essential_feat_4;
            }
            
            const buyBtn = p1.querySelector(".btn-card");
            if (buyBtn) buyBtn.textContent = d.btn_buy;
        }
        
        // Plus Plan
        const p2 = document.querySelector(".pricing-card[data-plan='plus']");
        if (p2) {
            const planBadge = p2.querySelector(".plan-badge");
            if (planBadge) planBadge.textContent = d.plan_popular;
            
            const labels = p2.querySelectorAll(".price-label");
            if (labels.length >= 2) {
                labels[0].textContent = d.label_official_price;
                labels[1].textContent = d.label_our_price;
            }
            
            const features = p2.querySelectorAll(".features .feature-item span");
            if (features.length >= 4) {
                features[0].textContent = d.plus_feat_1;
                features[1].textContent = d.plus_feat_2;
                features[2].textContent = d.plus_feat_3;
                features[3].textContent = d.plus_feat_4;
            }
            
            const buyBtn = p2.querySelector(".btn-card");
            if (buyBtn) buyBtn.textContent = d.btn_buy;
        }
        
        // Premium Plan
        const p3 = document.querySelector(".pricing-card[data-plan='premium']");
        if (p3) {
            const planBadge = p3.querySelector(".plan-badge");
            if (planBadge) planBadge.textContent = d.plan_offer;
            
            const labels = p3.querySelectorAll(".price-label");
            if (labels.length >= 2) {
                labels[0].textContent = d.label_official_price;
                labels[1].textContent = d.label_our_price;
            }
            
            const features = p3.querySelectorAll(".features .feature-item span");
            if (features.length >= 4) {
                features[0].textContent = d.premium_feat_1;
                features[1].textContent = d.premium_feat_2;
                features[2].textContent = d.premium_feat_3;
                features[3].textContent = d.premium_feat_4;
            }
            
            const buyBtn = p3.querySelector(".btn-card");
            if (buyBtn) buyBtn.textContent = d.btn_buy_best;
        }

        // Gifts Section
        const giftsBadge = document.querySelector("#gifts .section-header .badge");
        if (giftsBadge) giftsBadge.textContent = d.gifts_badge;
        const giftsTitle = document.querySelector("#gifts .section-title");
        if (giftsTitle) giftsTitle.textContent = d.gifts_title;
        const giftsSubtitle = document.querySelector("#gifts .section-subtitle");
        if (giftsSubtitle) giftsSubtitle.textContent = d.gifts_subtitle;
        
        const giftCards = document.querySelectorAll("#gifts .gift-card");
        if (giftCards.length >= 5) {
            // Gift 1
            const badge1 = giftCards[0].querySelector(".gift-badge");
            if (badge1) badge1.textContent = d.gift_1_badge;
            const t1 = giftCards[0].querySelector(".gift-title");
            if (t1) t1.textContent = d.gift_1_title;
            const desc1 = giftCards[0].querySelector(".gift-description");
            if (desc1) desc1.textContent = d.gift_1_desc;
            
            // Gift 2
            const t2 = giftCards[1].querySelector(".gift-title");
            if (t2) t2.textContent = d.gift_2_title;
            const desc2 = giftCards[1].querySelector(".gift-description");
            if (desc2) desc2.textContent = d.gift_2_desc;
            
            // Gift 3
            const t3 = giftCards[2].querySelector(".gift-title");
            if (t3) t3.textContent = d.gift_3_title;
            const desc3 = giftCards[2].querySelector(".gift-description");
            if (desc3) desc3.textContent = d.gift_3_desc;
            
            // Gift 4
            const t4 = giftCards[3].querySelector(".gift-title");
            if (t4) t4.textContent = d.gift_4_title;
            const desc4 = giftCards[3].querySelector(".gift-description");
            if (desc4) desc4.textContent = d.gift_4_desc;
            
            // Gift 5
            const t5 = giftCards[4].querySelector(".gift-title");
            if (t5) t5.textContent = d.gift_5_title;
            const desc5 = giftCards[4].querySelector(".gift-description");
            if (desc5) desc5.textContent = d.gift_5_desc;
        }
        
        // Blog Section
        const blogBadge = document.querySelector("#blog .badge");
        if (blogBadge) blogBadge.textContent = d.blog_badge;
        const blogTitle = document.querySelector("#blog .section-title");
        if (blogTitle) blogTitle.textContent = d.blog_title;
        const blogSubtitle = document.querySelector("#blog .section-subtitle");
        if (blogSubtitle) blogSubtitle.textContent = d.blog_subtitle;
        
        const blogCards = document.querySelectorAll("#blog .blog-card");
        if (blogCards.length >= 3) {
            // Card 1
            const tag1 = blogCards[0].querySelector(".blog-tag");
            if (tag1) tag1.textContent = d.blog_tag_tool;
            const title1 = blogCards[0].querySelector(".blog-title a");
            if (title1) title1.textContent = d.blog_art_1_title;
            const desc1 = blogCards[0].querySelector(".blog-excerpt");
            if (desc1) desc1.textContent = d.blog_art_1_desc;
            
            // Card 2
            const tag2 = blogCards[1].querySelector(".blog-tag");
            if (tag2) tag2.textContent = d.blog_tag_guide;
            const title2 = blogCards[1].querySelector(".blog-title a");
            if (title2) title2.textContent = d.blog_art_2_title;
            const desc2 = blogCards[1].querySelector(".blog-excerpt");
            if (desc2) desc2.textContent = d.blog_art_2_desc;
            
            // Card 3
            const tag3 = blogCards[2].querySelector(".blog-tag");
            if (tag3) tag3.textContent = d.blog_tag_tips;
            const title3 = blogCards[2].querySelector(".blog-title a");
            if (title3) title3.textContent = d.blog_art_3_title;
            const desc3 = blogCards[2].querySelector(".blog-excerpt");
            if (desc3) desc3.textContent = d.blog_art_3_desc;
        }
        
        const blogLinks = document.querySelectorAll("#blog .blog-link");
        blogLinks.forEach(link => {
            const svg = link.querySelector("svg");
            link.textContent = d.blog_read_more + " ";
            if (svg) link.appendChild(svg);
        });
        
        const blogAllBtn = document.querySelector("#blog .blog-footer .btn");
        if (blogAllBtn) blogAllBtn.textContent = d.blog_btn_all;
        
        // Contact Section
        const contactTitle = document.querySelector("#contact .contact-title");
        if (contactTitle) contactTitle.textContent = d.contact_title;
        const contactDesc = document.querySelector("#contact .contact-description");
        if (contactDesc) contactDesc.textContent = d.contact_desc;
        
        const trustItems = document.querySelectorAll("#contact .trust-item span");
        if (trustItems.length >= 3) {
            trustItems[0].textContent = d.trust_reputation;
            trustItems[1].textContent = d.trust_security;
            trustItems[2].textContent = d.trust_support;
        }
        
        // Footer
        const footerText = document.querySelector(".footer .footer-text");
        if (footerText) footerText.textContent = d.footer_text;
    };

    // Render Language Selector in Navbar
    const renderSelector = (activeLang) => {
        const navbar = document.querySelector(".navbar");
        if (!navbar) return;

        let container = document.querySelector(".lang-selector-container");
        if (container) {
            container.remove();
        }

        container = document.createElement("div");
        container.className = "lang-selector-container";

        const currentLabel = languageNames[activeLang];
        
        container.innerHTML = `
            <div class="lang-selected">
                <span>${currentLabel}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </div>
            <div class="lang-dropdown">
                ${supportedLanguages.map(lang => `
                    <div class="lang-option ${lang === activeLang ? "active" : ""}" data-lang="${lang}">
                        ${languageNames[lang]}
                    </div>
                `).join("")}
            </div>
        `;

        const navLinks = document.querySelector(".nav-links");
        if (navLinks) {
            navbar.insertBefore(container, navLinks);
        } else {
            navbar.appendChild(container);
        }

        const selectedEl = container.querySelector(".lang-selected");
        const dropdownEl = container.querySelector(".lang-dropdown");

        selectedEl.addEventListener("click", (e) => {
            e.stopPropagation();
            dropdownEl.classList.toggle("show");
        });

        document.addEventListener("click", () => {
            dropdownEl.classList.remove("show");
        });

        const options = container.querySelectorAll(".lang-option");
        options.forEach(opt => {
            opt.addEventListener("click", () => {
                const selectedLang = opt.getAttribute("data-lang");
                localStorage.setItem("preferred_language", selectedLang);
                applyTranslations(selectedLang);
                renderSelector(selectedLang);
            });
        });
    };

    // Add styles for i18n selector dynamically
    const style = document.createElement("style");
    style.textContent = `
        .lang-selector-container {
            position: relative;
            cursor: pointer;
            font-family: var(--font-heading);
            font-size: var(--font-size-sm);
            font-weight: 600;
            user-select: none;
            z-index: 1010;
            margin-left: auto;
            margin-right: var(--spacing-md);
        }
        @media (max-width: 768px) {
            .lang-selector-container {
                margin: var(--spacing-sm) 0;
            }
        }
        .lang-selected {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 6px 12px;
            background: rgba(5, 150, 105, 0.05);
            border: 1px solid var(--color-border-glass);
            border-radius: var(--radius-sm);
            color: var(--color-text-secondary);
            transition: all var(--transition-fast);
        }
        .lang-selected:hover {
            color: var(--color-primary);
            border-color: var(--color-primary);
            background: rgba(5, 150, 105, 0.08);
        }
        .lang-dropdown {
            position: absolute;
            top: calc(100% + 6px);
            right: 0;
            background: var(--color-bg-white);
            border: 1px solid var(--color-border-glass);
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-glass);
            display: none;
            flex-direction: column;
            overflow: hidden;
            min-width: 120px;
        }
        .lang-dropdown.show {
            display: flex;
        }
        .lang-option {
            padding: 8px 16px;
            color: var(--color-text-secondary);
            transition: all var(--transition-fast);
            text-align: left;
        }
        .lang-option:hover {
            background: rgba(5, 150, 105, 0.05);
            color: var(--color-primary);
        }
        .lang-option.active {
            color: var(--color-primary);
            background: rgba(5, 150, 105, 0.08);
            font-weight: 700;
        }
    `;
    document.head.appendChild(style);

    // Initial load
    const activeLang = getLanguage();
    applyTranslations(activeLang);
    renderSelector(activeLang);
});
