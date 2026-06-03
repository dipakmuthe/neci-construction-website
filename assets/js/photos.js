/**
 * Photos page — gallery category filters
 */
(function () {
    "use strict";

    var grid = document.getElementById("photosGalleryGrid");
    var filterBar = document.querySelector(".gallery-filters");

    if (!grid || !filterBar) {
        return;
    }

    var items = grid.querySelectorAll(".gallery-item");
    var buttons = filterBar.querySelectorAll(".gallery-filter-btn");

    function setActiveButton(activeBtn) {
        buttons.forEach(function (btn) {
            var isActive = btn === activeBtn;
            btn.classList.toggle("is-active", isActive);
            btn.setAttribute("aria-pressed", isActive ? "true" : "false");
        });
    }

    function applyFilter(category) {
        var visibleIndex = 0;

        items.forEach(function (item) {
            var match = category === "all" || item.getAttribute("data-category") === category;
            item.classList.toggle("is-hidden", !match);

            if (match) {
                item.style.transitionDelay = Math.min(visibleIndex * 0.04, 0.28) + "s";
                visibleIndex += 1;
            } else {
                item.style.transitionDelay = "0s";
            }
        });

        grid.classList.toggle("is-filtering", category !== "all");
    }

    buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            var filter = btn.getAttribute("data-filter") || "all";
            setActiveButton(btn);
            applyFilter(filter);
        });
    });
})();
