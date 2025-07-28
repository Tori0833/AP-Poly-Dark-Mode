// ==UserScript==
// @name         AP Poly Dark Mode
// @icon         https://github.com/Tori0833/AP-Poly-Dark-Mode/blob/main/resources/icon.png?raw=true
// @namespace    https://github.com/Tori0833/AP-Poly-Dark-Mode
// @version      1.0.1
// @description  A Tampermonkey script to darken the AP Polytechnic student portal interface.
// @author       tori.toriko (discord) & Claude.ai
// @match        https://ap.poly.edu.vn/*
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    // Create and inject dark mode CSS
    const darkModeCSS = `
        /* === GLOBAL DARK THEME === */
        body, html {
            background-color: #121212 !important;
            color: #eeeeee !important;
        }

        body.kt-page--loading.kt-header--fixed.kt-subheader--enabled.kt-aside--fixed {
            background-color: #121212 !important;
        }

        /* === HEADER DARK MODE === */
        #kt_header,
        .kt-header {
            background-color: #1e1e1e !important;
            border-bottom: 1px solid #333 !important;
        }

        .kt-header__topbar {
            background-color: #1e1e1e !important;
        }

        .kt-header__topbar-item,
        .kt-header__topbar-user {
            color: #eeeeee !important;
        }

        .kt-header__topbar-item a,
        .kt-header__topbar-user a {
            color: #eeeeee !important;
        }

        /* === SIDEBAR DARK MODE === */
        #kt_aside,
        .kt-aside {
            background-color: #1e1e1e !important;
            border-right: 1px solid #333 !important;
        }

        .kt-aside__brand {
            background-color: #1e1e1e !important;
            border-bottom: 1px solid #333 !important;
        }

        .kt-aside__menu-wrapper {
            background-color: #1e1e1e !important;
        }

        .kt-menu__nav {
            background-color: #1e1e1e !important;
        }

        .kt-menu__item {
            border-bottom: 1px solid #2c2c2c !important;
        }

        .kt-menu__link {
            color: #eeeeee !important;
            background-color: transparent !important;
        }

        .kt-menu__link:hover {
            background-color: #2c2c2c !important;
            color: #80b3ff !important;
        }

        .kt-menu__link-text {
            color: #eeeeee !important;
        }

        .kt-menu__link-icon {
            color: #eeeeee !important;
        }

        /* Active menu items */
        .kt-menu__item--active .kt-menu__link {
            background-color: #2c2c2c !important;
            color: #80b3ff !important;
        }

        /* === MAIN CONTENT AREA === */
        #kt_wrapper,
        .kt-wrapper {
            background-color: #121212 !important;
        }

        .kt-grid__item--fluid {
            background-color: #121212 !important;
        }

        .kt-content {
            background-color: #121212 !important;
        }

        /* === DROPDOWNS === */
        .dropdown-menu {
            background-color: #2c2c2c !important;
            border: 1px solid #444 !important;
            color: #eeeeee !important;
        }

        .dropdown-item {
            color: #eeeeee !important;
            background-color: transparent !important;
        }

        .dropdown-item:hover,
        .dropdown-item:focus {
            background-color: #444 !important;
            color: #80b3ff !important;
        }

        /* === MODALS & POPUPS === */
        .modal-content {
            background-color: #2c2c2c !important;
            border: 1px solid #444 !important;
            color: #eeeeee !important;
        }

        .modal-header {
            background-color: #2c2c2c !important;
            border-bottom: 1px solid #444 !important;
        }

        .modal-body {
            background-color: #2c2c2c !important;
            color: #eeeeee !important;
        }

        .modal-footer {
            background-color: #2c2c2c !important;
            border-top: 1px solid #444 !important;
        }

        /* === FORMS === */
        .form-container {
            background-color: #2c2c2c !important;
            color: #eeeeee !important;
        }

        .form-group {
            color: #eeeeee !important;
        }

        .form-control {
            background-color: #1e1e1e !important;
            border: 1px solid #555 !important;
            color: #eeeeee !important;
        }

        .form-control:focus {
            background-color: #1e1e1e !important;
            border-color: #80b3ff !important;
            color: #eeeeee !important;
            box-shadow: 0 0 0 0.2rem rgba(128, 179, 255, 0.25) !important;
        }

        .form-control::placeholder {
            color: #999 !important;
        }

        .custom-control {
            color: #eeeeee !important;
        }

        .custom-control-input:checked ~ .custom-control-label::before {
            background-color: #80b3ff !important;
            border-color: #80b3ff !important;
        }

        /* === BUTTONS === */
        .btn {
            border: 1px solid #555 !important;
        }

        .btn-primary {
            background-color: #0d6efd !important;
            border-color: #0d6efd !important;
            color: #ffffff !important;
        }

        .btn-secondary {
            background-color: #2c2c2c !important;
            border-color: #555 !important;
            color: #eeeeee !important;
        }

        .btn:hover {
            opacity: 0.8 !important;
        }

        /* === TABLES === */
        .table {
            background-color: #2c2c2c !important;
            color: #eeeeee !important;
        }

        .table th,
        .table td {
            border-color: #444 !important;
            color: #eeeeee !important;
        }

        .table-striped tbody tr:nth-of-type(odd) {
            background-color: rgba(255, 255, 255, 0.05) !important;
        }

        /* === NOTIFICATIONS === */
        .kt-notification {
            background-color: #2c2c2c !important;
            border: 1px solid #444 !important;
            color: #eeeeee !important;
        }

        .kt-user-card {
            background-color: #2c2c2c !important;
            color: #eeeeee !important;
        }

        /* === LINKS === */
        a {
            color: #80b3ff !important;
        }

        a:hover {
            color: #66a3ff !important;
        }

        /* === CARDS & PANELS === */
        .card {
            background-color: #2c2c2c !important;
            border: 1px solid #444 !important;
            color: #eeeeee !important;
        }

        .card-header {
            background-color: #1e1e1e !important;
            border-bottom: 1px solid #444 !important;
            color: #eeeeee !important;
        }

        .card-body {
            background-color: #2c2c2c !important;
            color: #eeeeee !important;
        }

        /* === SCROLLBARS === */
        ::-webkit-scrollbar {
            width: 8px !important;
            height: 8px !important;
        }

        ::-webkit-scrollbar-track {
            background: #1e1e1e !important;
        }

        ::-webkit-scrollbar-thumb {
            background: #555 !important;
            border-radius: 4px !important;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: #777 !important;
        }

        /* === TEXT INPUTS & SELECTS === */
        input, textarea, select {
            background-color: #1e1e1e !important;
            border: 1px solid #555 !important;
            color: #eeeeee !important;
        }

        input:focus, textarea:focus, select:focus {
            border-color: #80b3ff !important;
            box-shadow: 0 0 0 0.2rem rgba(128, 179, 255, 0.25) !important;
        }

        /* === BREADCRUMBS === */
        .breadcrumb {
            background-color: #2c2c2c !important;
        }

        .breadcrumb-item a {
            color: #80b3ff !important;
        }

        .breadcrumb-item.active {
            color: #eeeeee !important;
        }

        /* === ALERTS === */
        .alert {
            border: 1px solid #444 !important;
            color: #eeeeee !important;
        }

        .alert-info {
            background-color: #1a4a6b !important;
            border-color: #1e5f7d !important;
        }

        .alert-warning {
            background-color: #6b4a1a !important;
            border-color: #7d5f1e !important;
        }

        .alert-danger {
            background-color: #6b1a1a !important;
            border-color: #7d1e1e !important;
        }

        .alert-success {
            background-color: #1a6b1a !important;
            border-color: #1e7d1e !important;
        }

        /* === GENERAL OVERRIDES === */
        * {
            scrollbar-width: thin !important;
            scrollbar-color: #555 #1e1e1e !important;
        }

        /* Force any remaining white backgrounds to dark */
        div, span, section, article, main, aside, header, footer, nav {
            background-color: inherit !important;
        }

        /* Ensure text remains readable */
        p, h1, h2, h3, h4, h5, h6, span, div, td, th, li {
            color: #eeeeee !important;
        }

        /* Fix nav tabs */
        .nav-tabs {
          background-color: #1e1e1e !important;
          border-color: #333 !important;
        }

        .nav-link {
          background-color: transparent !important;
          color: #aaa !important;
          border-color: #444 !important;
        }

        .nav-link.active {
          background-color: #2a2a2a !important;
          color: #fff !important;
          border-color: #444 #444 #2a2a2a !important;
        }

    `;

    // Function to inject CSS with higher priority
    function injectCSS() {
        // Remove any existing dark mode styles
        const existingStyle = document.getElementById('darkmode-ap-poly');
        if (existingStyle) {
            existingStyle.remove();
        }

        const style = document.createElement('style');
        style.type = 'text/css';
        style.id = 'darkmode-ap-poly';
        style.innerHTML = darkModeCSS;

        // Inject into head with high priority
        if (document.head) {
            document.head.appendChild(style);
        } else {
            // Fallback: create head if it doesn't exist
            const head = document.createElement('head');
            head.appendChild(style);
            document.documentElement.insertBefore(head, document.documentElement.firstChild);
        }

        console.log('AP Poly Dark Mode: CSS injected successfully');
    }

    // Inject CSS immediately and repeatedly to ensure it applies
    injectCSS();

    // Also inject after a short delay to override any late-loading styles
    setTimeout(injectCSS, 500);
    setTimeout(injectCSS, 1000);
    setTimeout(injectCSS, 2000);

    // Also inject when DOM is ready (backup)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectCSS);
    }

    // Watch for dynamically loaded content
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length > 0) {
                // Re-apply styles to new elements if needed
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) { // Element node
                        // Force dark background on new elements
                        if (node.style) {
                            if (node.classList && (
                                node.classList.contains('modal-content') ||
                                node.classList.contains('dropdown-menu') ||
                                node.classList.contains('form-control')
                            )) {
                                // These elements get special handling
                                setTimeout(() => injectCSS(), 100);
                            }
                        }
                    }
                });
            }
        });
    });

    // Start observing
    if (document.body) {
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    } else {
        document.addEventListener('DOMContentLoaded', function() {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }

})();