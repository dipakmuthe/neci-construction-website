(function () {
    "use strict";

    if (typeof serviceCatalog === "undefined" || !serviceCatalog.length) {
        return;
    }

    var CONTACT = {
        phone: "+91XXXXXXXXXX",
        whatsapp: "91XXXXXXXXXX"
    };

    var INITIAL_VISIBLE = 6;
    var LOAD_MORE_STEP = 6;
    var SIDEBAR_VISIBLE_SUBS = 8;

    var categoryList = document.getElementById("catalogCategories");
    var productList = document.getElementById("catalogProducts");
    var catalogContent = document.getElementById("catalogContent");
    var catalogProductsPanel = document.getElementById("catalogProductsPanel");
    var catalogTitle = document.getElementById("catalogTitle");
    var catalogSubtitle = document.getElementById("catalogSubtitle");
    var catalogBreadcrumb = document.getElementById("catalogBreadcrumb");
    var catalogLoadMoreWrap = document.getElementById("catalogLoadMoreWrap");
    var catalogShowMoreBtn = document.getElementById("catalogShowMoreBtn");
    var productCategory = document.getElementById("productCategory");
    var productName = document.getElementById("productName");
    var productPrice = document.getElementById("productPrice");
    var productUnit = document.getElementById("productUnit");
    var productMoq = document.getElementById("productMoq");
    var productLocation = document.getElementById("productLocation");
    var productSpecsList = document.getElementById("productSpecsList");
    var productDescription = document.getElementById("productDescription");
    var productMainImage = document.getElementById("productMainImage");
    var productThumbs = document.getElementById("productThumbs");
    var catalogDetail = document.getElementById("catalogDetail");
    var productWhatsappBtn = document.getElementById("productWhatsappBtn");
    var productCallBtn = document.getElementById("productCallBtn");
    var productEnquiryBtn = document.getElementById("productEnquiryBtn");
    var productPriceLink = document.getElementById("productPriceLink");
    var backToProductsBtn = document.getElementById("backToProductsBtn");
    var backToProductsBtnBottom = document.getElementById("backToProductsBtnBottom");

    if (!categoryList || !productList) {
        return;
    }

    var hashId = window.location.hash ? window.location.hash.replace("#", "") : "";
    var listScope = "all";
    var activeCategory = null;
    var activeProduct = null;
    var expandedCategoryId = "";
    var visibleProductCount = INITIAL_VISIBLE;
    var viewMode = "products";
    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var detailUpdateTimer = null;

    function findCategoryByHash(id) {
        if (!id) {
            return null;
        }
        return (
            serviceCatalog.find(function (c) {
                return c.id === id;
            }) ||
            serviceCatalog.find(function (c) {
                return c.products.some(function (p) {
                    return p.id === id;
                });
            }) ||
            null
        );
    }

    function findProductById(id) {
        var found = null;
        serviceCatalog.some(function (cat) {
            var product = cat.products.find(function (p) {
                return p.id === id;
            });
            if (product) {
                found = { category: cat, product: product };
                return true;
            }
            return false;
        });
        return found;
    }

    function findProductInCategory(category, id) {
        if (!category || !id) {
            return null;
        }
        return category.products.find(function (p) {
            return p.id === id;
        });
    }

    function getAllProductsFlat() {
        var items = [];
        serviceCatalog.forEach(function (category) {
            category.products.forEach(function (product) {
                items.push({ category: category, product: product });
            });
        });
        return items;
    }

    function escapeHtml(text) {
        var div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
    }

    function truncate(text, max) {
        if (!text || text.length <= max) {
            return text || "";
        }
        return text.slice(0, max).trim() + "…";
    }

    function productCountLabel(count) {
        return count === 1 ? "1 product available" : count + " products available";
    }

    /**
     * Scrolls the page to the catalog area with an offset for the sticky navbar.
     */
    function scrollToCatalog() {
        window.setTimeout(function () {
            if (catalogContent) {
                var offset = window.innerWidth < 992 ? 70 : 110;
                var top = catalogContent.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: top,
                    behavior: prefersReducedMotion ? "auto" : "smooth"
                });
            }
        }, 100);
    }

    function resolveInitialState() {
        if (!hashId) {
            listScope = "all";
            activeCategory = null;
            activeProduct = null;
            expandedCategoryId = "";
            return;
        }

        var categoryOnly = serviceCatalog.find(function (c) {
            return c.id === hashId;
        });

        if (categoryOnly) {
            listScope = "category";
            activeCategory = categoryOnly;
            activeProduct = categoryOnly.products[0];
            expandedCategoryId = categoryOnly.id;
            return;
        }

        var match = findProductById(hashId);
        if (match) {
            listScope = "category";
            activeCategory = match.category;
            activeProduct = match.product;
            expandedCategoryId = match.category.id;
        }
    }

    function renderBreadcrumbs() {
        if (!catalogBreadcrumb) {
            return;
        }

        var crumbs = [
            { label: "Home", href: "index.html" },
            { label: "Products & Services", href: "services.html" }
        ];

        if (viewMode === "detail" && activeProduct && activeCategory) {
            if (listScope === "category") {
                crumbs.push({
                    label: activeCategory.name,
                    href: "services.html#" + activeCategory.id
                });
            }
            crumbs.push({ label: activeProduct.name, href: null });
        } else if (listScope === "category" && activeCategory) {
            crumbs.push({ label: activeCategory.name, href: null });
        }

        catalogBreadcrumb.innerHTML = crumbs
            .map(function (crumb, index) {
                var isLast = index === crumbs.length - 1;
                if (isLast || !crumb.href) {
                    return (
                        '<li class="breadcrumb-item' +
                        (isLast ? " active" : "") +
                        '" aria-current="' +
                        (isLast ? "page" : "false") +
                        '">' +
                        escapeHtml(crumb.label) +
                        "</li>"
                    );
                }
                return (
                    '<li class="breadcrumb-item">' +
                    '<a href="' +
                    escapeHtml(crumb.href) +
                    '">' +
                    escapeHtml(crumb.label) +
                    "</a></li>"
                );
            })
            .join("");
    }

    function updateHeaderCopy() {
        if (viewMode === "detail" && activeProduct) {
            catalogTitle.textContent = activeProduct.name;
            catalogSubtitle.textContent = activeCategory
                ? activeCategory.name + " · " + truncate(activeProduct.description, 140)
                : truncate(activeProduct.description, 140);
            return;
        }

        if (listScope === "all") {
            catalogTitle.textContent = "All Products & Services";
            catalogSubtitle.textContent =
                "Browse our complete catalog of " +
                getAllProductsFlat().length +
                " solutions. Filter by category from the sidebar or use Show More to load additional items.";
            return;
        }

        if (activeCategory) {
            catalogTitle.textContent = activeCategory.name;
            catalogSubtitle.textContent = activeCategory.intro;
        }
    }

    function updateContactLinks() {
        if (!activeProduct) {
            return;
        }

        var categoryName = activeCategory ? activeCategory.name : "Products";
        var msg =
            "Hello NECI, I am interested in " +
            activeProduct.name +
            " (" +
            categoryName +
            "). Please share details.";

        if (productWhatsappBtn) {
            productWhatsappBtn.href =
                "https://wa.me/" + CONTACT.whatsapp + "?text=" + encodeURIComponent(msg);
        }

        if (productCallBtn) {
            productCallBtn.href = "tel:" + CONTACT.phone;
        }

        if (productEnquiryBtn) {
            productEnquiryBtn.href =
                "contact.html?product=" + encodeURIComponent(activeProduct.name);
        }

        if (productPriceLink) {
            productPriceLink.href =
                "contact.html?product=" + encodeURIComponent(activeProduct.name);
        }
    }

    function setViewMode(mode) {
        viewMode = mode;

        if (catalogContent) {
            catalogContent.classList.toggle("is-detail-view", mode === "detail");
        }

        if (catalogProductsPanel) {
            catalogProductsPanel.hidden = mode === "detail";
        }

        if (catalogDetail) {
            catalogDetail.hidden = mode !== "detail";
        }

        if (mode === "detail") {
            renderProductDetails();
            observeReveal([catalogDetail]);
            window.setTimeout(function () {
                if (catalogDetail) {
                    var top = catalogDetail.getBoundingClientRect().top + window.scrollY - 100;
                    window.scrollTo({
                        top: top,
                        behavior: prefersReducedMotion ? "auto" : "smooth"
                    });
                }
            }, 80);
        }

        updateHeaderCopy();
        renderBreadcrumbs();
    }

    /**
     * Switches view to show all products from all categories.
     * @param {boolean} resetVisible - If true, resets pagination to initial count.
     * @param {boolean} shouldScroll - If true, scrolls up to the catalog content.
     */
    function showAllProducts(resetVisible, shouldScroll) {
        listScope = "all";
        activeCategory = null;
        activeProduct = null;
        expandedCategoryId = "";

        if (resetVisible !== false) {
            visibleProductCount = INITIAL_VISIBLE;
        }

        history.replaceState(null, "", "services.html");
        setViewMode("products");
        renderAll();

        if (shouldScroll) {
            scrollToCatalog();
        }
    }

    function showProductsView() {
        setViewMode("products");

        if (listScope === "all") {
            history.replaceState(null, "", "services.html");
        } else if (activeCategory) {
            history.replaceState(null, "", "#" + activeCategory.id);
        }

        renderProducts();
        updateHeaderCopy();
        renderBreadcrumbs();

        if (catalogProductsPanel) {
            catalogProductsPanel.scrollIntoView({
                behavior: prefersReducedMotion ? "auto" : "smooth",
                block: "start"
            });
        }
    }

    function animateDetailUpdate(callback) {
        if (!catalogDetail || prefersReducedMotion) {
            callback();
            return;
        }

        catalogDetail.classList.add("is-updating");

        if (detailUpdateTimer) {
            clearTimeout(detailUpdateTimer);
        }

        detailUpdateTimer = window.setTimeout(function () {
            callback();
            catalogDetail.classList.remove("is-updating");
        }, 200);
    }

    function setMainImage(src, alt) {
        if (!productMainImage) {
            return;
        }

        if (prefersReducedMotion) {
            productMainImage.src = src;
            productMainImage.alt = alt;
            return;
        }

        productMainImage.classList.add("is-swapping");

        window.setTimeout(function () {
            productMainImage.src = src;
            productMainImage.alt = alt;
            productMainImage.classList.remove("is-swapping");
        }, 160);
    }

    function selectCategory(category, product, expandPanel) {
        listScope = "category";
        activeCategory = category;
        activeProduct = product || category.products[0];
        expandedCategoryId = expandPanel !== false ? category.id : expandedCategoryId;
        visibleProductCount = category.products.length;
        history.replaceState(null, "", "#" + activeCategory.id);
        setViewMode("products");
        renderAll();
        scrollToCatalog();
    }

    function openProductDetail(product, category) {
        if (!product) {
            return;
        }

        if (category) {
            activeCategory = category;
            listScope = "category";
            expandedCategoryId = category.id;
        }

        activeProduct = product;
        history.replaceState(null, "", "#" + product.id);

        animateDetailUpdate(function () {
            renderCategories();
            renderProducts();
            setViewMode("detail");
            updateContactLinks();
        });
    }

    function buildProductCardHtml(item, isActive) {
        var category = item.category;
        var product = item.product;

        return (
            '<article class="catalog-product-card reveal-on-scroll' +
            (isActive ? " active" : "") +
            '" role="listitem" data-product-id="' +
            escapeHtml(product.id) +
            '" data-category-id="' +
            escapeHtml(category.id) +
            '" data-tilt tabindex="0">' +
            '<div class="catalog-product-media">' +
            '<span class="catalog-product-badge">' +
            escapeHtml(category.name) +
            "</span>" +
            '<img src="' +
            escapeHtml(product.image) +
            '" alt="' +
            escapeHtml(product.name) +
            '" loading="lazy">' +
            "</div>" +
            '<div class="catalog-product-body">' +
            "<h2>" +
            escapeHtml(product.name) +
            "</h2>" +
            '<p class="catalog-product-desc">' +
            escapeHtml(truncate(product.description, 100)) +
            "</p>" +
            '<p class="catalog-product-price"><strong>' +
            escapeHtml(product.price) +
            "</strong> " +
            escapeHtml(product.unit) +
            "</p>" +
            '<span class="catalog-view-btn">' +
            "View Details " +
            '<i class="bi bi-arrow-right" aria-hidden="true"></i>' +
            "</span>" +
            "</div>" +
            "</article>"
        );
    }

    function bindProductCards() {
        productList.querySelectorAll(".catalog-product-card").forEach(function (card) {
            function handleOpen() {
                var productId = card.getAttribute("data-product-id");
                var categoryId = card.getAttribute("data-category-id");
                var category = serviceCatalog.find(function (c) {
                    return c.id === categoryId;
                });
                var product = category && findProductInCategory(category, productId);
                if (product) {
                    openProductDetail(product, category);
                }
            }

            card.addEventListener("click", handleOpen);
            card.addEventListener("keydown", function (e) {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleOpen();
                }
            });

            initTilt(card);
        });
    }

    function updateShowMoreButton(totalCount) {
        if (!catalogLoadMoreWrap || !catalogShowMoreBtn) {
            return;
        }

        if (listScope !== "all" || viewMode === "detail") {
            catalogLoadMoreWrap.hidden = true;
            return;
        }

        var remaining = totalCount - visibleProductCount;
        catalogLoadMoreWrap.hidden = remaining <= 0;

        if (remaining > 0) {
            catalogShowMoreBtn.innerHTML =
                "Show More Products (" +
                Math.min(remaining, LOAD_MORE_STEP) +
                " more) <i class=\"bi bi-chevron-down\" aria-hidden=\"true\"></i>";
        }
    }

    function renderProducts() {
        var items = [];
        var totalCount = 0;

        if (listScope === "all") {
            items = getAllProductsFlat();
            totalCount = items.length;
            items = items.slice(0, visibleProductCount);
        } else if (activeCategory) {
            items = activeCategory.products.map(function (product) {
                return { category: activeCategory, product: product };
            });
            totalCount = items.length;
        }

        productList.innerHTML = items
            .map(function (item) {
                var isActive =
                    viewMode === "detail" &&
                    activeProduct &&
                    item.product.id === activeProduct.id;
                return buildProductCardHtml(item, isActive);
            })
            .join("");

        bindProductCards();
        observeReveal(productList.querySelectorAll(".reveal-on-scroll"));
        updateShowMoreButton(totalCount);
        updateHeaderCopy();
        renderBreadcrumbs();
    }

    function renderCategories() {
        var allActive = listScope === "all" && viewMode !== "detail";

        var allItem =
            '<div class="catalog-accordion-item catalog-all-item' +
            (allActive ? " is-active" : "") +
            '">' +
            '<button type="button" class="catalog-accordion-trigger catalog-all-trigger" data-scope="all">' +
            '<span class="catalog-accordion-label">' +
            "<strong>All Products & Services</strong>" +
            "<small>" +
            getAllProductsFlat().length +
            " products available</small>" +
            "</span>" +
            '<i class="bi bi-grid-fill catalog-accordion-icon" aria-hidden="true"></i>' +
            "</button></div>";

        var categoryItems = serviceCatalog
            .map(function (category) {
                var isActive =
                    listScope === "category" &&
                    activeCategory &&
                    category.id === activeCategory.id;
                var isExpanded = category.id === expandedCategoryId;
                var countLabel = productCountLabel(category.products.length);

                var visibleSubs = category.products.slice(0, SIDEBAR_VISIBLE_SUBS);
                var hiddenSubCount = category.products.length - visibleSubs.length;

                var subLinks = visibleSubs
                    .map(function (product) {
                        var selected =
                            isActive && activeProduct && product.id === activeProduct.id
                                ? " is-selected"
                                : "";
                        return (
                            '<a href="#' +
                            escapeHtml(product.id) +
                            '" class="catalog-sub-link' +
                            selected +
                            '" data-category-id="' +
                            escapeHtml(category.id) +
                            '" data-product-id="' +
                            escapeHtml(product.id) +
                            '">' +
                            escapeHtml(product.name) +
                            "</a>"
                        );
                    })
                    .join("");

                if (hiddenSubCount > 0) {
                    subLinks +=
                        '<a href="#' +
                        escapeHtml(category.id) +
                        '" class="catalog-sub-link catalog-sub-more" data-category-id="' +
                        escapeHtml(category.id) +
                        '">+ ' +
                        hiddenSubCount +
                        " more products</a>";
                }

                return (
                    '<div class="catalog-accordion-item' +
                    (isActive ? " is-active" : "") +
                    (isExpanded ? " is-expanded" : "") +
                    '" data-category-id="' +
                    escapeHtml(category.id) +
                    '">' +
                    '<button type="button" class="catalog-accordion-trigger" aria-expanded="' +
                    isExpanded +
                    '" data-category-id="' +
                    escapeHtml(category.id) +
                    '">' +
                    '<span class="catalog-accordion-label">' +
                    "<strong>" +
                    escapeHtml(category.name) +
                    "</strong>" +
                    "<small>" +
                    countLabel +
                    "</small>" +
                    "</span>" +
                    '<i class="bi bi-chevron-down catalog-accordion-icon" aria-hidden="true"></i>' +
                    "</button>" +
                    '<div class="catalog-accordion-panel">' +
                    '<div class="catalog-accordion-panel-inner">' +
                    '<div class="catalog-sub-list">' +
                    subLinks +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>"
                );
            })
            .join("");

        categoryList.innerHTML = allItem + categoryItems;

        var allTrigger = categoryList.querySelector(".catalog-all-trigger");
        if (allTrigger) {
            allTrigger.addEventListener("click", function () {
                showAllProducts(true);
            });
        }

        categoryList.querySelectorAll(".catalog-accordion-trigger:not(.catalog-all-trigger)").forEach(function (trigger) {
            trigger.addEventListener("click", function () {
                var categoryId = trigger.getAttribute("data-category-id");
                var category = serviceCatalog.find(function (c) {
                    return c.id === categoryId;
                });

                if (!category) {
                    return;
                }

                if (
                    expandedCategoryId === categoryId &&
                    listScope === "category" &&
                    activeCategory &&
                    activeCategory.id === categoryId &&
                    viewMode === "products"
                ) {
                    expandedCategoryId = "";
                    renderCategories();
                    return;
                }

                expandedCategoryId = categoryId;
                selectCategory(category, category.products[0], true);
            });
        });

        categoryList.querySelectorAll(".catalog-sub-link").forEach(function (link) {
            link.addEventListener("click", function (event) {
                event.preventDefault();

                var categoryId = link.getAttribute("data-category-id");
                var productId = link.getAttribute("data-product-id");
                var category = serviceCatalog.find(function (c) {
                    return c.id === categoryId;
                });

                if (!category) {
                    return;
                }

                expandedCategoryId = categoryId;

                if (link.classList.contains("catalog-sub-more") || !productId) {
                    selectCategory(category, category.products[0], true);
                    return;
                }

                var product = findProductInCategory(category, productId);
                if (product) {
                    activeCategory = category;
                    listScope = "category";
                    openProductDetail(product, category);
                }
            });
        });
    }

    function renderProductDetails() {
        if (!activeProduct) {
            return;
        }

        var categoryName = activeCategory ? activeCategory.name : "Products & Services";
        productCategory.textContent = categoryName;
        productName.textContent = activeProduct.name;
        productPrice.textContent = activeProduct.price;
        productUnit.textContent = activeProduct.unit ? " " + activeProduct.unit : "";

        if (productMoq) {
            productMoq.textContent = activeProduct.moq || "As per project requirement";
        }

        if (productLocation) {
            productLocation.textContent =
                activeProduct.specs["Service Location"] || "Pune, Maharashtra";
        }

        productDescription.textContent = activeProduct.description;

        setMainImage(
            activeProduct.images[0] || activeProduct.image,
            activeProduct.name
        );

        if (productSpecsList) {
            productSpecsList.innerHTML = Object.keys(activeProduct.specs)
                .map(function (label) {
                    return (
                        "<li>" +
                        '<i class="bi bi-check-circle-fill" aria-hidden="true"></i>' +
                        "<span><strong>" +
                        escapeHtml(label) +
                        ":</strong> " +
                        escapeHtml(activeProduct.specs[label]) +
                        "</span></li>"
                    );
                })
                .join("");
        }

        productThumbs.innerHTML = activeProduct.images
            .map(function (image, index) {
                return (
                    '<button type="button" role="tab" aria-selected="' +
                    (index === 0) +
                    '" class="' +
                    (index === 0 ? "active" : "") +
                    '" data-image="' +
                    escapeHtml(image) +
                    '">' +
                    '<img src="' +
                    escapeHtml(image) +
                    '" alt="' +
                    escapeHtml(activeProduct.name) +
                    " image " +
                    (index + 1) +
                    '" loading="lazy">' +
                    "</button>"
                );
            })
            .join("");

        productThumbs.querySelectorAll("button").forEach(function (button) {
            button.addEventListener("click", function () {
                productThumbs.querySelectorAll("button").forEach(function (item) {
                    item.classList.remove("active");
                    item.setAttribute("aria-selected", "false");
                });
                button.classList.add("active");
                button.setAttribute("aria-selected", "true");
                setMainImage(button.getAttribute("data-image"), activeProduct.name);
            });
        });

        updateContactLinks();
        updateHeaderCopy();
        renderBreadcrumbs();
    }

    function renderAll() {
        renderCategories();
        renderProducts();
        if (viewMode === "detail") {
            renderProductDetails();
        }
    }

    function bindBackButtons() {
        [backToProductsBtn, backToProductsBtnBottom].forEach(function (btn) {
            if (!btn) {
                return;
            }
            btn.addEventListener("click", function () {
                showProductsView();
                renderCategories();
            });
        });
    }

    if (catalogShowMoreBtn) {
        catalogShowMoreBtn.addEventListener("click", function () {
            visibleProductCount += LOAD_MORE_STEP;
            renderProducts();
            if (catalogLoadMoreWrap) {
                catalogLoadMoreWrap.scrollIntoView({
                    behavior: prefersReducedMotion ? "auto" : "smooth",
                    block: "nearest"
                });
            }
        });
    }

    var revealObserver = null;

    function observeReveal(elements) {
        if (!elements || !elements.length) {
            return;
        }

        if (!revealObserver) {
            revealObserver = new IntersectionObserver(
                function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("is-visible");
                            revealObserver.unobserve(entry.target);
                        }
                    });
                },
                { root: null, rootMargin: "0px 0px -6% 0px", threshold: 0.1 }
            );
        }

        elements.forEach(function (el) {
            if (el && !el.classList.contains("is-visible")) {
                revealObserver.observe(el);
            }
        });
    }

    function initPageReveal() {
        document.querySelectorAll(".services-hero .hero-reveal").forEach(function (el) {
            el.classList.add("is-visible");
        });

        document.querySelectorAll(".catalog-header.reveal-on-scroll").forEach(function (el) {
            observeReveal([el]);
        });
    }

    function initTilt(card) {
        if (prefersReducedMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
            return;
        }

        var maxTilt = 5;

        card.addEventListener("mousemove", function (event) {
            var rect = card.getBoundingClientRect();
            var x = (event.clientX - rect.left) / rect.width - 0.5;
            var y = (event.clientY - rect.top) / rect.height - 0.5;
            card.style.transform =
                "translateY(-6px) rotateX(" +
                y * -maxTilt +
                "deg) rotateY(" +
                x * maxTilt +
                "deg)";
        });

        card.addEventListener("mouseleave", function () {
            card.style.transform = "";
        });
    }

    window.addEventListener("hashchange", function () {
        var id = window.location.hash.replace("#", "");
        if (!id) {
            showAllProducts(true, true);
            return;
        }

        var category = serviceCatalog.find(function (c) {
            return c.id === id;
        });

        if (category) {
            expandedCategoryId = category.id;
            selectCategory(category, category.products[0], true);
            return;
        }

        var match = findProductById(id);
        if (match) {
            expandedCategoryId = match.category.id;
            activeCategory = match.category;
            listScope = "category";
            openProductDetail(match.product, match.category);
        }
    });

    var sidebar = document.querySelector(".catalog-sidebar");

    if (sidebar) {
        window.addEventListener(
            "scroll",
            function () {
                if (window.innerWidth < 992) {
                    sidebar.classList.remove("is-scrolled");
                    return;
                }
                sidebar.classList.toggle("is-scrolled", window.scrollY > 120);
            },
            { passive: true }
        );
    }

    // Catch footer links that point to the current page to ensure they scroll up
    document.addEventListener("click", function (e) {
        var link = e.target.closest('.site-footer a[href*="services.html"]');
        if (!link) return;

        var url = new URL(link.href, window.location.origin);
        if (url.pathname.endsWith("services.html") && !url.hash && 
            window.location.pathname.endsWith("services.html") && !window.location.hash) {
            e.preventDefault();
            showAllProducts(true, true);
        }
    });

    bindBackButtons();
    initPageReveal();
    resolveInitialState();

    if (hashId && findProductById(hashId)) {
        var detailMatch = findProductById(hashId);
        openProductDetail(detailMatch.product, detailMatch.category);
    } else if (hashId && findCategoryByHash(hashId)) {
        selectCategory(findCategoryByHash(hashId), null, true);
    } else {
        showAllProducts(true);
    }
})();
