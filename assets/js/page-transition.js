/* Shared page transition logic for link navigation and reloads */
(function () {
    const overlayId = 'page-transition-overlay';
    const visibleClass = 'visible';

    function getTransitionLogoSrc() {
        const iconLink = document.querySelector('link[rel~="icon"], link[rel="shortcut icon"]');
        if (iconLink && iconLink.href) {
            return iconLink.href;
        }
        return new URL('assets/componentes/img/favicon/favicon.png', document.baseURI).href;
    }

    function createOverlay() {
        if (document.getElementById(overlayId)) return null;

        const overlay = document.createElement('div');
        overlay.id = overlayId;
        overlay.className = 'page-transition-overlay';
        overlay.setAttribute('aria-hidden', 'true');
        overlay.innerHTML = `
      <div class="page-transition-inner" role="status" aria-live="polite" aria-atomic="true">
        <div class="transition-logo" aria-hidden="true">
          <img src="${getTransitionLogoSrc()}" alt="Ícone Akindo">
        </div>
        <div class="page-transition-text">
          <span class="loading-text">Carregando...</span>
          <div class="loading-dots" aria-hidden="true">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>
    `;

        document.body.appendChild(overlay);
        return overlay;
    }

    function showOverlay(overlay) {
        if (!overlay) return;
        overlay.setAttribute('aria-hidden', 'false');
        overlay.classList.add(visibleClass);
    }

    function hideOverlay(overlay) {
        if (!overlay) return;
        overlay.setAttribute('aria-hidden', 'true');
        overlay.classList.remove(visibleClass);
    }

    function shouldAnimateLink(link, event) {
        if (!link.href) return false;
        if (link.target && link.target !== '_self') return false;
        if (link.hasAttribute('download')) return false;
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return false;

        const url = new URL(link.href, window.location.origin);
        const sameHost = url.origin === window.location.origin;
        const isHash = url.pathname === window.location.pathname && url.search === window.location.search;

        return sameHost && !link.href.startsWith('mailto:') && !link.href.startsWith('tel:') && !isHash;
    }

    function attachLinkHandlers(overlay) {
        document.addEventListener('click', (event) => {
            const link = event.target.closest('a[href]');
            if (!link || !shouldAnimateLink(link, event)) return;

            event.preventDefault();
            showOverlay(overlay);
            window.setTimeout(() => {
                window.location.href = link.href;
            }, 60);
        });
    }

    function attachUnloadHandler(overlay) {
        window.addEventListener('beforeunload', () => {
            showOverlay(overlay);
        });
    }

    function initTransition() {
        const overlay = createOverlay();
        if (!overlay) return;

        attachLinkHandlers(overlay);
        attachUnloadHandler(overlay);

        window.addEventListener('pageshow', () => {
            hideOverlay(overlay);
        });

        window.addEventListener('load', () => {
            hideOverlay(overlay);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTransition);
    } else {
        initTransition();
    }
})();
