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

    var currentCategory = "all";
    var visibleLimit = 12;
    var itemsPerLoad = 6;

    var showMoreBtn = document.getElementById("galleryShowMoreBtn");
    var showMoreWrap = document.getElementById("galleryLoadMoreWrap");

    function setActiveButton(activeBtn) {
        buttons.forEach(function (btn) {
            var isActive = btn === activeBtn;
            btn.classList.toggle("is-active", isActive);
            btn.setAttribute("aria-pressed", isActive ? "true" : "false");
        });
    }

    function applyFilter(category) {
        currentCategory = category;
        var matchingIndex = 0;

        items.forEach(function (item) {
            var match = category === "all" || item.getAttribute("data-category") === category;
            if (match) {
                if (matchingIndex < visibleLimit) {
                    item.classList.remove("is-hidden");
                    item.style.transitionDelay = Math.min(matchingIndex * 0.04, 0.28) + "s";
                } else {
                    item.classList.add("is-hidden");
                    item.style.transitionDelay = "0s";
                }
                matchingIndex += 1;
            } else {
                item.classList.add("is-hidden");
                item.style.transitionDelay = "0s";
            }
        });

        grid.classList.toggle("is-filtering", category !== "all");

        // Toggle "Show More" wrapper based on whether there are more matching items to show
        if (showMoreWrap) {
            if (matchingIndex > visibleLimit) {
                showMoreWrap.classList.remove("d-none");
            } else {
                showMoreWrap.classList.add("d-none");
            }
        }
    }

    buttons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            var filter = btn.getAttribute("data-filter") || "all";
            setActiveButton(btn);
            visibleLimit = 12; // Reset limit when filter changes
            applyFilter(filter);
        });
    });

    if (showMoreBtn) {
        showMoreBtn.addEventListener("click", function () {
            visibleLimit += itemsPerLoad;
            applyFilter(currentCategory);
        });
    }

    // Initialize pagination on page load
    applyFilter("all");

    var lightbox = document.createElement("div");
    lightbox.className = "gallery-lightbox";
    lightbox.innerHTML =
        '<button type="button" class="gallery-lightbox-close" aria-label="Close preview">' +
        '<i class="bi bi-x-lg" aria-hidden="true"></i>' +
        '</button>' +
        '<img src="" alt="Gallery preview">' +
        '<p></p>';
    document.body.appendChild(lightbox);

    var lightboxImg = lightbox.querySelector("img");
    var lightboxCaption = lightbox.querySelector("p");
    var lightboxClose = lightbox.querySelector(".gallery-lightbox-close");

    function closeLightbox() {
        lightbox.classList.remove("is-open");
        document.body.classList.remove("gallery-lightbox-open");
    }

    // Disabled lightbox intercept to let cards navigate to dedicated product pages directly
    /*
    grid.querySelectorAll(".gallery-card").forEach(function (card) {
        card.addEventListener("click", function (event) {
            var img = card.querySelector("img");
            var title = card.querySelector(".gallery-title");
            if (!img) return;

            event.preventDefault();
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt || "Gallery preview";
            lightboxCaption.textContent = title ? title.textContent : img.alt;
            lightbox.classList.add("is-open");
            document.body.classList.add("gallery-lightbox-open");
        });
    });
    */

    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    if (lightboxClose) {
        lightboxClose.addEventListener("click", closeLightbox);
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
            closeLightbox();
        }
    });
})();
