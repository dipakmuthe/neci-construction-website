/**
 * Builds navbar mega menu from serviceCatalog (catalog-data.js).
 * Compact layout: ~half viewport height, scrollable body, 3 sub-links + "+ more" max.
 */
(function () {
    "use strict";

    if (typeof serviceCatalog === "undefined" || !serviceCatalog.length) {
        return;
    }

    var MAX_VISIBLE_LINKS = 3; // Kept at 3 for vertical compactness

    function escapeHtml(text) {
        var div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
    }

    function buildCategoryBlock(category) {
        var visible = category.products.slice(0, MAX_VISIBLE_LINKS);
        var hiddenCount = category.products.length - visible.length;
        var linksHtml = visible
            .map(function (product) {
                return (
                    '<a href="services.html#' +
                    escapeHtml(product.id) +
                    '">' +
                    escapeHtml(product.name) +
                    "</a>"
                );
            })
            .join("");

        if (hiddenCount > 0) {
            linksHtml +=
                '<a href="services.html#' +
                escapeHtml(category.id) +
                '" class="mega-more-link">+ ' +
                hiddenCount +
                " more</a>";
        }

        return (
            '<div class="mega-menu-block">' +
            '<h5><i class="bi bi-arrow-right-short text-warning"></i><a href="services.html#' +
            escapeHtml(category.id) +
            '">' +
            escapeHtml(category.name) +
            "</a></h5>" +
            '<div class="mega-menu-links">' +
            linksHtml +
            "</div>" +
            "</div>"
        );
    }

    function buildMegaMenuHtml() {
        // Flat list of blocks; CSS Grid handles 4-column distribution
        var blocksHtml = serviceCatalog.map(buildCategoryBlock).join("");

        return (
            '<div class="mega-menu-inner" data-mega-built="true">' +
            '<div class="mega-menu-scroll">' +
            '<div class="mega-menu-grid">' +
            blocksHtml +
            "</div></div>" +
            '<div class="mega-menu-footer">' +
            '<a href="services.html" class="mega-view-all">View All Products &amp; Services <i class="bi bi-arrow-right"></i></a>' +
            "</div></div>"
        );
    }

    document.querySelectorAll(".mega-menu").forEach(function (menu) {
        if (menu.querySelector("[data-mega-built]")) {
            return;
        }

        menu.innerHTML = buildMegaMenuHtml();
        menu.classList.add("mega-menu--compact");
    });

    window.dispatchEvent(new Event("resize"));
})();
