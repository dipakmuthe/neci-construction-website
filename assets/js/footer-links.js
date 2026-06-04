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

    var serviceEl = document.getElementById("footerServiceLinks");

    if (serviceEl) {
        // Filter for specific important services requested
        var importantIds = [
            "false-flooring-service-cat",
            "false-ceiling-cat",
            "wall-partitions-cat",
            "metal-ceiling-main",
            "air-louver-cat"
        ];

        var linksHtml = serviceCatalog
            .filter(function(cat) { return importantIds.indexOf(cat.id) !== -1; })
            .map(function (category) {
                return '<a href="services.html#' + escapeHtml(category.id) + '">' + escapeHtml(category.name) + '</a>';
            }).join("");

        serviceEl.innerHTML = linksHtml + '<a href="services.html" class="footer-more-link"><strong>+ More Services &rarr;</strong></a>';
    }
})();
