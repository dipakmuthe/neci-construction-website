const fs = require('fs');
const path = require('path');
const vm = require('vm');

// 1. Read catalog-data.js
const projectRoot = path.join(__dirname, '..');
const catalogDataPath = path.join(projectRoot, 'assets/js/catalog-data.js');
const catalogDataContent = fs.readFileSync(catalogDataPath, 'utf8');

// 2. Execute catalog-data.js to load the serviceCatalog variable
const sandbox = {
    serviceCatalog: null
};
vm.createContext(sandbox);
vm.runInContext(catalogDataContent, sandbox);
const serviceCatalog = sandbox.serviceCatalog;

if (!serviceCatalog || !serviceCatalog.length) {
    console.error("Failed to load serviceCatalog from catalog-data.js");
    process.exit(1);
}

// 3. Define the product ID to HTML filename mapping
const productFileMap = {
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

// Ensure products directory exists
const productsDir = path.join(projectRoot, 'products');
if (!fs.existsSync(productsDir)){
    fs.mkdirSync(productsDir);
}

// Helper to dynamically match product images by similarity in the products folder
function getProductImages(product, category) {
    let list = [product.image];
    
    // Extract base name, e.g. "aluminum-false-ceiling" from "assets/images/products/aluminum-false-ceiling-500x500.jpg"
    const parsed = path.parse(product.image);
    const baseName = parsed.name.replace(/-\d+x\d+$/, '').replace(/\s*\(\d+\)$/, '').replace(/-service$/, '').replace(/-svc$/, '');
    
    // Scan assets/images/products/
    const productsImgDir = path.join(projectRoot, 'assets', 'images', 'products');
    if (fs.existsSync(productsImgDir)) {
        const files = fs.readdirSync(productsImgDir);
        files.forEach(file => {
            const filePath = `assets/images/products/${file}`;
            if (filePath === product.image) return;
            
            const fileParsed = path.parse(file);
            const fileBaseName = fileParsed.name.replace(/-\d+x\d+$/, '').replace(/\s*\(\d+\)$/, '').replace(/-service$/, '').replace(/-svc$/, '');
            
            // If filenames are similar, add to gallery
            if (fileBaseName === baseName || (baseName.length > 5 && fileBaseName.includes(baseName)) || (fileBaseName.length > 5 && baseName.includes(fileBaseName))) {
                if (!list.includes(filePath)) {
                    list.push(filePath);
                }
            }
        });
    }
    
    // If not enough similar images, add other product images from same category
    if (list.length < 3 && category && category.products) {
        category.products.forEach(p => {
            if (p.image !== product.image && !list.includes(p.image)) {
                list.push(p.image);
            }
        });
    }
    
    // Final fallbacks (MUST be strictly from products folder)
    const fallbacks = [
        "assets/images/products/false-ceiling.jpg",
        "assets/images/products/flooring.jpg",
        "assets/images/products/wall-partition.jpg"
    ];
    for (let f of fallbacks) {
        if (list.length >= 3) break;
        if (!list.includes(f)) {
            list.push(f);
        }
    }
    
    return list.slice(0, 4);
}

// 4. Page Generation Function
function generateProductPage(category, product) {
    // Gallery Thumbnails HTML
    const images = getProductImages(product, category);
    const thumbsHtml = images.map((image, index) => {
        const activeClass = index === 0 ? 'active' : '';
        const selectedAttr = index === 0 ? 'true' : 'false';
        return `
            <button type="button" role="tab" aria-selected="${selectedAttr}" class="${activeClass}" data-image="../${image}">
                <img src="../${image}" alt="${product.name} image ${index + 1}" loading="lazy">
            </button>
        `.trim();
    }).join('\n');

    // Specifications Highlights
    const serviceLocation = product.specs["Service Location"] || "Pan India";
    const features = product.specs.Features || "Precision installation, premium finish and project-ready detailing";
    const benefits = product.specs.Benefits || "Durable performance, clean aesthetics and dependable execution";

    // Build specs list (excluding standard features/benefits/location for separate highlights)
    let additionalSpecsListHtml = '';
    let specificationsTableRows = '';
    
    Object.keys(product.specs).forEach(key => {
        // Table row for all specs
        specificationsTableRows += `
            <tr>
                <th scope="row" class="text-primary" style="width: 40%; font-weight: 600;">${key}</th>
                <td class="text-secondary">${product.specs[key]}</td>
            </tr>
        `.trim();

        // Additional specifications bullet highlights (exclude features, benefits, location as they have highlighted fields)
        if (key !== "Features" && key !== "Benefits" && key !== "Service Location") {
            additionalSpecsListHtml += `
                <li>
                    <i class="bi bi-check-circle-fill" aria-hidden="true"></i>
                    <span><strong>${key}:</strong> ${product.specs[key]}</span>
                </li>
            `.trim();
        }
    });

    // Related Products HTML (up to 3 items from same category, excluding current product)
    const relatedProducts = category.products.filter(p => p.id !== product.id).slice(0, 3);
    const relatedProductsHtml = relatedProducts.map(rp => {
        const rpFile = productFileMap[rp.id] || `${rp.id}.html`;
        return `
            <div class="col-12 col-md-6 col-lg-4">
                <article class="catalog-product-card" onclick="window.location.href='${rpFile}'" tabindex="0">
                    <div class="catalog-product-media">
                        <span class="catalog-product-badge">${category.name}</span>
                        <img src="../${rp.image}" alt="${rp.name}" loading="lazy">
                    </div>
                    <div class="catalog-product-body">
                        <h2>${rp.name}</h2>
                        <p class="catalog-product-desc">${rp.description.slice(0, 100)}${rp.description.length > 100 ? '...' : ''}</p>
                        <p class="catalog-product-price"><strong>${rp.price}</strong> ${rp.unit || ''}</p>
                        <span class="catalog-view-btn">
                            View Details <i class="bi bi-arrow-right" aria-hidden="true"></i>
                        </span>
                    </div>
                </article>
            </div>
        `.trim();
    }).join('\n');

    // Page content template
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${product.name} | NECI Construction</title>
    <meta name="description" content="${product.description.slice(0, 155)}">
    <link rel="shortcut icon" href="../assets/images/logo/neci_logo-1.png" type="image/png">
    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="../assets/css/style.css?v=2">
    <link rel="stylesheet" href="../assets/css/services.css?v=2">
    <style>
        /* Compact layout without hero section */
        .service-catalog-page {
            padding-top: calc(var(--neci-navbar-height) + 0.5rem) !important;
            background: linear-gradient(180deg, #f8fafc 0%, #fdfdfd 120px);
        }
        
        /* Smooth Page Reveal & Fade-Up Animations */
        @keyframes revealFadeUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .catalog-breadcrumb {
            animation: revealFadeUp 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .catalog-detail-card {
            animation: revealFadeUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.05s forwards;
            opacity: 0;
            animation-fill-mode: forwards;
        }
        
        .product-description-specs {
            animation: revealFadeUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.12s forwards;
            opacity: 0;
            animation-fill-mode: forwards;
        }
        
        .related-products {
            animation: revealFadeUp 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.18s forwards;
            opacity: 0;
            animation-fill-mode: forwards;
        }
        
        /* Interactive Gallery Hover Zoom */
        .main-product-image {
            overflow: hidden;
        }
        .main-product-image img {
            transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease !important;
        }
        .main-product-image:hover img {
            transform: scale(1.04);
        }
        
        /* Related Cards Premium Transitions */
        .related-products .catalog-product-card {
            cursor: pointer;
            transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
        }
        .related-products .catalog-product-card:hover {
            transform: translateY(-6px) !important;
            box-shadow: 0 16px 36px rgba(27, 31, 107, 0.12) !important;
            border-color: rgba(244, 180, 0, 0.3) !important;
        }
        
        .related-products .catalog-product-media img {
            transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
        }
        .related-products .catalog-product-card:hover .catalog-product-media img {
            transform: scale(1.05) !important;
        }
        
        .specifications-table th {
            font-weight: 600;
            color: var(--neci-primary);
        }
    </style>
</head>
<body id="top" class="services-page">

<!-- ================= NAVBAR ================= -->
<nav class="navbar navbar-expand-lg custom-navbar sticky-top">
    <div class="container-fluid px-3 px-lg-4">
        <a class="navbar-brand" href="../index.html">
            <img src="../assets/images/logo/neci_logo-1.png" alt="NECI Logo">
        </a>

        <button class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto align-items-lg-center">
                <li class="nav-item">
                    <a class="nav-link" href="../index.html">Home</a>
                </li>

                <li class="nav-item dropdown mega-dropdown">
                    <div class="nav-item-mega-wrap">
                        <a class="nav-link active"
                           href="../services.html"
                           id="servicesDropdown">
                            Products & Services
                        </a>
                        <button type="button"
                                class="mega-mobile-toggle d-lg-none"
                                aria-label="Toggle services menu"
                                aria-expanded="false">
                            <i class="bi bi-chevron-down"></i>
                        </button>
                    </div>

                    <div class="dropdown-menu mega-menu mega-menu--dynamic p-4"></div>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="../about.html">About Us</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="../photos.html">Gallery</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="../contact.html">Contact</a>
                </li>
            </ul>
        </div>
    </div>
</nav>

<!-- ================= PRODUCT MAIN DETAILS ================= -->
<main class="service-catalog-page">
    <div class="container pt-2 pb-4">
        
        <!-- Breadcrumbs -->
        <nav class="catalog-breadcrumb" aria-label="Breadcrumb">
            <ol>
                <li class="breadcrumb-item"><a href="../index.html">Home</a></li>
                <li class="breadcrumb-item"><a href="../services.html">Products & Services</a></li>
                <li class="breadcrumb-item"><a href="../services.html#${category.id}">${category.name}</a></li>
                <li class="breadcrumb-item active" aria-current="page">${product.name}</li>
            </ol>
        </nav>

        <!-- Product Gallery & Details Card -->
        <article class="catalog-detail-card mb-5" id="catalogDetail">
            <div class="detail-layout">
                <!-- Gallery Column -->
                <div class="detail-gallery-col">
                    <div class="main-product-image">
                        <img id="productMainImage" src="../${product.image}" alt="${product.name}">
                    </div>
                    <div id="productThumbs" class="gallery-thumbs gallery-thumbs--row" role="tablist" aria-label="Product images">
                        ${thumbsHtml}
                    </div>
                </div>

                <!-- Product Details Column -->
                <div class="product-details">
                    <span class="product-category-label">${category.name}</span>
                    <h2 class="fw-bold mb-3">${product.name}</h2>

                    <div class="product-meta-grid">
                        <div class="product-meta-item">
                            <span class="meta-label">Price</span>
                            <p class="meta-value">
                                <strong id="productPrice">${product.price}</strong>
                                <span id="productUnit">${product.unit ? " " + product.unit : ""}</span>
                            </p>
                            <a href="../contact.html?product=${encodeURIComponent(product.name)}" class="price-link" id="productPriceLink">Get Latest Price</a>
                        </div>
                        <div class="product-meta-item">
                            <span class="meta-label">Minimum Order Quantity</span>
                            <p class="meta-value" id="productMoq">${product.moq}</p>
                        </div>
                        <div class="product-meta-item product-meta-item--location">
                            <span class="meta-label">Service Location</span>
                            <p class="meta-value" id="productLocation">${serviceLocation}</p>
                        </div>
                    </div>

                    <!-- Specs bullet point list -->
                    <ul id="productSpecsList" class="spec-features-list">
                        <li>
                            <i class="bi bi-check-circle-fill" aria-hidden="true"></i>
                            <span><strong>Features:</strong> ${features}</span>
                        </li>
                        <li>
                            <i class="bi bi-check-circle-fill" aria-hidden="true"></i>
                            <span><strong>Benefits:</strong> ${benefits}</span>
                        </li>
                        ${additionalSpecsListHtml}
                    </ul>

                    <div class="product-actions product-actions--detail mt-4">
                        <a href="../contact.html?product=${encodeURIComponent(product.name)}" class="action-btn action-btn-primary" id="productEnquiryBtn">
                            <span>Request Quote</span>
                            <i class="bi bi-arrow-right" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>
            </div>
        </article>

        <!-- Product Description & Specifications Tables -->
        <div class="row g-4 mb-5 product-description-specs">
            <!-- Left: Description -->
            <div class="col-lg-7">
                <div class="p-4 bg-white rounded-4 border border-light-subtle shadow-sm h-100">
                    <h3 class="fw-bold text-primary mb-3">Product Description</h3>
                    <p class="fs-6 text-secondary mb-0" style="line-height: 1.7; text-align: justify;">
                        ${product.description}
                    </p>
                </div>
            </div>

            <!-- Right: Specifications Table -->
            <div class="col-lg-5">
                <div class="p-4 bg-white rounded-4 border border-light-subtle shadow-sm h-100">
                    <h3 class="fw-bold text-primary mb-3">Product Specifications</h3>
                    <div class="table-responsive">
                        <table class="table table-striped table-hover specifications-table mb-0">
                            <tbody>
                                ${specificationsTableRows}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- ================= RELATED PRODUCTS SECTION ================= -->
        ${relatedProducts.length > 0 ? `
        <section class="related-products border-top pt-5">
            <h2 class="section-title text-center mb-4 text-primary fw-bold">Related Products</h2>
            <div class="row g-4">
                ${relatedProductsHtml}
            </div>
        </section>
        ` : ''}

    </div>
</main>

<!-- ================= FOOTER ================= -->
<footer class="site-footer">
    <div class="container">
        <div class="footer-grid">
            <div class="footer-brand">
                <a href="../index.html" class="footer-logo">
                    <img src="../assets/images/logo/neci_logo-1.png" alt="NECI Construction Engineering logo">
                </a>

                <p>
                    Premium construction, ceiling, partition, flooring and interior engineering solutions in Pune.
                </p>

                <a href="tel:+91XXXXXXXXXX" class="footer-contact-link">
                    <i class="bi bi-telephone"></i>
                    <span>+91 XXXXX XXXXX</span>
                </a>

                <a href="mailto:info@neci.com" class="footer-contact-link">
                    <i class="bi bi-envelope"></i>
                    <span>info@neci.com</span>
                </a>

                <div class="footer-social">
                    <a href="#" aria-label="Facebook">
                        <i class="bi bi-facebook"></i>
                    </a>
                    <a href="#" aria-label="Instagram">
                        <i class="bi bi-instagram"></i>
                    </a>
                    <a href="#" aria-label="LinkedIn">
                        <i class="bi bi-linkedin"></i>
                    </a>
                    <a href="https://wa.me/91XXXXXXXXXX"
                       class="footer-whatsapp"
                       target="_blank"
                       rel="noopener"
                       aria-label="WhatsApp">
                        <i class="bi bi-whatsapp"></i>
                    </a>
                </div>
            </div>

            <div class="footer-column">
                <h3>Company</h3>
                <a href="../index.html">Home</a>
                <a href="../about.html">About</a>
                <a href="../services.html">Services</a>
                <a href="../photos.html">Gallery</a>
                <a href="../contact.html">Contact</a>
            </div>

            <div class="footer-column">
                <h3>Services</h3>
                <div id="footerServiceLinks"></div>
            </div>

            <div class="footer-column">
                <h3>Support</h3>
                <a href="../contact.html">Get a Quote</a>
                <a href="../contact.html">Project Enquiry</a>
                <a href="../contact.html">Customer Support</a>
                <a href="../contact.html">Site Visit Request</a>
            </div>

            <div class="footer-column">
                <h3>Also From NECI</h3>
                <a href="../about.html">Quality Policy</a>
                <a href="../about.html">Our Mission</a>
                <a href="../about.html">Our Vision</a>
                <a href="../about.html">Our Clients</a>
            </div>
        </div>

        <div class="footer-bottom">
            <div class="footer-legal">
                <a href="../index.html">Terms of Use</a>
                <a href="../index.html">Privacy Policy</a>
            </div>
            <p>&copy; 2026 NECI Construction Engineering. All Rights Reserved.</p>
        </div>
    </div>
</footer>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="../assets/js/catalog-data.js?v=2"></script>
<script src="../assets/js/nav-mega-menu.js?v=2"></script>
<script src="../assets/js/footer-links.js?v=2"></script>
<script src="../assets/js/script.js?v=2"></script>
<script>
    // Simple thumbnail click switching script
    document.querySelectorAll('#productThumbs button').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('#productThumbs button').forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            button.classList.add('active');
            button.setAttribute('aria-selected', 'true');
            const mainImg = document.getElementById('productMainImage');
            mainImg.classList.add('is-swapping');
            setTimeout(() => {
                mainImg.src = button.getAttribute('data-image');
                mainImg.alt = "${product.name}";
                mainImg.classList.remove('is-swapping');
            }, 160);
        });
    });
</script>
</body>
</html>
    `.trim();

    const destFile = productFileMap[product.id] || `${product.id}.html`;
    const destPath = path.join(productsDir, destFile);
    fs.writeFileSync(destPath, html, 'utf8');
    console.log(`Generated: products/${destFile}`);
}

// 5. Run generation for all products
let count = 0;
serviceCatalog.forEach(category => {
    category.products.forEach(product => {
        generateProductPage(category, product);
        count++;
    });
});

console.log(`Successfully generated ${count} product pages.`);
