/**
 * Builds navbar mega menu from serviceCatalog (catalog-data.js).
 * Direct links to standalone product detail pages.
 */
(function () {
    "use strict";

    if (typeof serviceCatalog === "undefined" || !serviceCatalog.length) {
        return;
    }

    var productFileMap = {
        "false-flooring": "false-flooring.html",
        "access-flooring-svc": "access-flooring.html",
        "aluminum-false-ceiling": "aluminum-false-ceiling.html",
        "metal-false-ceiling-svc": "metal-false-ceiling.html",
        "gypsum-board-false-ceiling": "gypsum-board-false-ceiling.html",
        "gypsum-false-ceiling": "gypsum-false-ceiling.html",
        "armstrong-false-ceiling": "armstrong-false-ceiling.html",
        "mineral-fiber-ceiling-svc": "mineral-fiber-ceiling.html",
        "baffle-ceiling": "baffle-ceiling.html",
        "mesh-ceiling": "mesh-ceiling.html",
        "designer-false-ceiling": "designer-false-ceiling.html",
        "calcium-silicate-ceiling": "calcium-silicate-ceiling.html",
        "grid-ceiling": "grid-ceiling.html",
        "pvc-false-ceiling": "pvc-false-ceiling.html",
        "office-false-ceiling": "office-false-ceiling.html",
        "glass-wall-partitions": "glass-wall-partitions.html",
        "gypsum-wall-partitions": "gypsum-wall-partitions.html",
        "fire-rated-partition-svc": "fire-rated-partition.html",
        "acoustic-partition-svc": "acoustic-partition.html",
        "office-partition": "office-partition.html",
        "modular-partition": "modular-partition.html",
        "hunter-douglas-louvers": "hunter-douglas-metal-louvers.html",
        "metal-sun-louvers-std": "metal-sun-louvers.html",
        "kitchen-louver-window": "kitchen-louver-window.html",
        "mineral-fiber-metal": "metal-ceiling.html",
        "roofing-solutions": "roofing-solutions.html",
        "ceiling-tiles-svc": "ceiling-tiles.html",
        "fresh-air-louvers": "fresh-air-louvers.html",
        "aluminum-air-louvers": "aluminum-air-louvers.html",
        "gi-air-louvers-svc": "gi-air-louvers.html",
        "insulation-service": "insulation-service.html",
        "acoustic-partition-main": "acoustic-partition-main.html",
        "perforated-panels-svc": "perforated-panels.html",
        "epoxy-painting-svc": "epoxy-floor-painting.html",
        "gypsum-partition-main": "gypsum-partition.html",
        "interior-renovation-svc": "interior-renovation.html",
        "flat-interior-renovation-svc": "flat-interior-renovation.html",
        "residential-construction-svc": "residential-construction.html",
        "steel-buildings": "steel-buildings.html",
        "erection-services": "erection-services.html",
        "welding-fabrication-svc": "welding-fabrication.html",
        "roof-fabrication-svc": "roof-fabrication.html"
    };

    var MAX_VISIBLE_LINKS = 3;
    var isSubdir = window.location.pathname.indexOf('/products/') !== -1 || window.location.pathname.indexOf('\\products\\') !== -1;
    var prefix = isSubdir ? '../' : '';
    var productPrefix = isSubdir ? '' : 'products/';

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
                var filename = productFileMap[product.id] || (product.id + ".html");
                return (
                    '<a href="' + prefix + productPrefix + filename + '">' +
                    escapeHtml(product.name) +
                    "</a>"
                );
            })
            .join("");

        if (hiddenCount > 0) {
            linksHtml +=
                '<a href="' + prefix + 'services.html#' +
                escapeHtml(category.id) +
                '" class="mega-more-link">+ ' +
                hiddenCount +
                " more</a>";
        }

        return (
            '<div class="mega-menu-block">' +
            '<h5><i class="bi bi-arrow-right-short text-warning"></i><a href="' + prefix + 'services.html#' +
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
        var blocksHtml = serviceCatalog.map(buildCategoryBlock).join("");

        return (
            '<div class="mega-menu-inner" data-mega-built="true">' +
            '<div class="mega-menu-scroll">' +
            '<div class="mega-menu-grid">' +
            blocksHtml +
            "</div></div>" +
            '<div class="mega-menu-footer">' +
            '<a href="' + prefix + 'services.html" class="mega-view-all">View All Products &amp; Services <i class="bi bi-arrow-right"></i></a>' +
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
