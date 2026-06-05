/**
 * Populates footer with all catalog categories and product links.
 * Requires catalog-data.js (serviceCatalog).
 */
(function () {
    "use strict";

    if (typeof serviceCatalog === "undefined" || !serviceCatalog.length) {
        return;
    }

    function escapeHtml(text) {
        var div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
    }

    var isSubdir = window.location.pathname.indexOf('/products/') !== -1 || window.location.pathname.indexOf('\\products\\') !== -1;
    var prefix = isSubdir ? '../' : '';

    var serviceEl = document.getElementById("footerServiceLinks");

    if (serviceEl) {
        // Filter for top 5 services requested
        var importantIds = [
            "false-ceiling-cat",
            "wall-partitions-cat",
            "false-flooring-service-cat",
            "metal-ceiling-main",
            "metal-sun-louvers-cat"
        ];

        // Ensure we preserve the requested order in display
        var orderedCategories = [];
        importantIds.forEach(function (id) {
            var found = serviceCatalog.find(function (cat) { return cat.id === id; });
            if (found) {
                orderedCategories.push(found);
            }
        });

        var linksHtml = orderedCategories
            .map(function (category) {
                return '<a href="' + prefix + 'services.html#' + escapeHtml(category.id) + '">' + escapeHtml(category.name) + '</a>';
            }).join("");

        serviceEl.innerHTML = linksHtml + '<a href="' + prefix + 'services.html" class="footer-more-link"><strong>+ More Services</strong></a>';
    }
})();
