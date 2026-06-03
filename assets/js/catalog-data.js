/* NECI full product catalog — categories & sub-products from site menu / IndiaMART-style listing */

function necProduct(cfg) {
    var base = {
        id: cfg.id,
        name: cfg.name,
        image: cfg.image,
        images: cfg.images || [cfg.image, "assets/images/gallery/g1.jpg", "assets/images/gallery/g2.jpg"],
        price: cfg.price || "Price on request",
        unit: cfg.unit || "",
        moq: cfg.moq || "As per project requirement",
        description: cfg.description || "",
        specs: cfg.specs || {}
    };
    if (!base.specs["Service Location"]) {
        base.specs["Service Location"] = "Pune, Maharashtra";
    }
    return base;
}

var serviceCatalog = [
    {
        id: "false-flooring-service",
        name: "False Flooring Service",
        intro: "Raised access and false flooring solutions for offices, server rooms, data centers and utility-heavy workspaces.",
        products: [
            necProduct({
                id: "false-flooring-installation",
                name: "False Flooring Service",
                image: "assets/images/products/flooring.jpg",
                images: ["assets/images/products/flooring.jpg", "assets/images/gallery/g5.jpg", "assets/images/photo/g1.jpg"],
                price: "Price on request",
                description: "Complete false flooring installation for commercial interiors with cable management and level access.",
                specs: { "Flooring Type": "Raised / access flooring", "Material": "As per project specification", "Usage/Application": "Office, server room, control room" }
            }),
            necProduct({
                id: "access-flooring-service",
                name: "Access Flooring Service",
                image: "assets/images/products/flooring.jpg",
                price: "Price on request",
                description: "Access flooring systems for IT rooms, BMS panels and technical floors requiring under-floor services.",
                specs: { "Flooring Type": "Access floor panel system", "Feature": "Under-floor cabling", "Usage/Application": "Data center and IT flooring" }
            })
        ]
    },
    {
        id: "false-ceiling",
        name: "False Ceiling",
        intro: "Modern false ceiling solutions for offices, shops, commercial spaces and industrial projects.",
        products: [
            necProduct({ id: "aluminum-false-ceiling", name: "Aluminum False Ceiling", image: "assets/images/products/false-ceiling.jpg", price: "Rs. 45", unit: "/Square Feet", description: "Lightweight aluminum false ceiling with clean finishing and durable support systems.", specs: { "Material": "Aluminum", "Finish": "Powder coated / customized" } }),
            necProduct({ id: "metal-false-ceiling-panel", name: "Metal False Ceiling", image: "assets/images/products/metal-ceiling.jpg", price: "Rs. 40", unit: "/Square Feet", description: "Metal false ceiling panels for commercial and industrial interiors.", specs: { "Material": "Metal panel", "Finish": "Plain / perforated" } }),
            necProduct({ id: "gypsum-board-false-ceiling", name: "Gypsum Board False Ceiling", image: "assets/images/gallery/g3.jpg", images: ["assets/images/gallery/g3.jpg", "assets/images/gallery/g4.jpg", "assets/images/products/false-ceiling.jpg"], price: "Rs. 80", unit: "/Square Feet", description: "Gypsum board false ceiling for smooth interiors with concealed lighting options.", specs: { "Material": "Gypsum board", "Design": "Plain, cove and customized" } }),
            necProduct({ id: "gypsum-false-ceiling", name: "Gypsum False Ceiling", image: "assets/images/gallery/g4.jpg", price: "Rs. 75", unit: "/Square Feet", description: "Gypsum false ceiling work for offices, retail and residential commercial fit-outs.", specs: { "Material": "Gypsum", "Design": "Standard and designer patterns" } }),
            necProduct({ id: "linear-false-ceiling", name: "Linear False Ceiling", image: "assets/images/gallery/g13.jpg", price: "Rs. 95", unit: "/Square Feet", description: "Linear false ceiling profiles for contemporary office and showroom interiors.", specs: { "Type": "Linear profile ceiling", "Material": "Metal / aluminum linear" } }),
            necProduct({ id: "pop-false-ceiling", name: "POP False Ceiling", image: "assets/images/products/false-ceiling.jpg", price: "Rs. 70", unit: "/Square Feet", description: "Plaster of Paris false ceiling with decorative molding and smooth finish.", specs: { "Material": "POP", "Finish": "Smooth / decorative" } }),
            necProduct({ id: "pvc-false-ceiling", name: "PVC False Ceiling", image: "assets/images/gallery/g14.jpg", price: "Rs. 55", unit: "/Square Feet", description: "PVC false ceiling panels for moisture-resistant and easy-maintenance areas.", specs: { "Material": "PVC", "Feature": "Moisture resistant" } }),
            necProduct({ id: "grid-false-ceiling", name: "Grid False Ceiling", image: "assets/images/products/metal-ceiling.jpg", price: "Rs. 38", unit: "/Square Feet", description: "Grid false ceiling systems with lay-in tiles for offices and commercial buildings.", specs: { "Type": "Grid ceiling system", "Tile Type": "Lay-in panels" } }),
            necProduct({ id: "designer-false-ceiling", name: "Designer False Ceiling", image: "assets/images/gallery/g1.jpg", price: "Rs. 120", unit: "/Square Feet", description: "Designer false ceiling concepts with premium finishes and architectural detailing.", specs: { "Design": "Custom designer", "Finish": "Premium interior finish" } })
        ]
    },
    {
        id: "wall-partitions",
        name: "Wall Partitions",
        intro: "Glass, gypsum and fire-rated partition systems built for modern layouts and long-term durability.",
        products: [
            necProduct({ id: "glass-wall-partitions", name: "Glass Wall Partitions", image: "assets/images/products/wall-partition.jpg", images: ["assets/images/products/wall-partition.jpg", "assets/images/gallery/g6.jpg", "assets/images/gallery/g10.jpg"], price: "Rs. 400", unit: "/Square Feet", description: "Glass wall partitions for cabins, meeting rooms and premium commercial spaces.", specs: { "Material": "Glass and aluminum frame", "Glass Type": "Clear, frosted or toughened" } }),
            necProduct({ id: "gypsum-wall-partitions", name: "Gypsum Wall Partitions", image: "assets/images/gallery/g7.jpg", price: "Rs. 90", unit: "/Square Feet", description: "Gypsum wall partitions for fast, clean space division in offices.", specs: { "Material": "Gypsum board", "Frame": "GI framework" } }),
            necProduct({ id: "fire-rated-partition", name: "Fire Rated Partition", image: "assets/images/gallery/g9.jpg", price: "Rs. 180", unit: "/Square Feet", description: "Fire rated partition walls meeting safety norms for commercial buildings.", specs: { "Feature": "Fire rated", "Material": "Fire-rated board system" } }),
            necProduct({ id: "wall-partitions-general", name: "Wall Partitions", image: "assets/images/products/wall-partition.jpg", price: "Rs. 85", unit: "/Square Feet", description: "General wall partition solutions for office and industrial interior layouts.", specs: { "Material": "As per site requirement", "Usage/Application": "Office and commercial partition" } }),
            necProduct({ id: "glass-partition", name: "Glass Partition", image: "assets/images/gallery/g10.jpg", price: "Rs. 380", unit: "/Square Feet", description: "Single and double glazed glass partitions with aluminum profiles.", specs: { "Material": "Glass partition", "Frame": "Aluminum profile" } }),
            necProduct({ id: "office-cabin-partition", name: "Office Cabin Partition", image: "assets/images/gallery/g6.jpg", price: "Rs. 320", unit: "/Square Feet", description: "Office cabin partitions combining glass, gypsum and door integrations.", specs: { "Usage/Application": "Office cabins and workstations", "Feature": "Integrated doors and channels" } })
        ]
    },
    {
        id: "metal-sun-louvers",
        name: "Metal Sun Louvers",
        intro: "Metal louver systems for sun protection, elevation design and controlled air movement.",
        products: [
            necProduct({ id: "hunter-douglas-metal-louvers", name: "Hunter Douglas Metal Louvers", image: "assets/images/gallery/g11.jpg", images: ["assets/images/gallery/g11.jpg", "assets/images/gallery/g12.jpg", "assets/images/products/air-louver.jpg"], price: "Rs. 180", unit: "/Square Feet", description: "Hunter Douglas style metal louvers for facade shading and architectural elevation.", specs: { "Material": "Metal / aluminum", "Usage/Application": "Exterior facade and sun control" } }),
            necProduct({ id: "metal-sun-louvers", name: "Metal Sun Louvers", image: "assets/images/gallery/g12.jpg", price: "Rs. 165", unit: "/Square Feet", description: "Metal sun louver installation for buildings requiring solar shading.", specs: { "Material": "Metal louver", "Finish": "Coated / powder coated" } })
        ]
    },
    {
        id: "metal-ceiling",
        name: "Metal Ceiling",
        intro: "Premium metal ceiling systems with strong finish, clean detailing and reliable performance.",
        products: [
            necProduct({ id: "mineral-fiber-ceiling-tiles", name: "Mineral Fiber Ceiling Tiles", image: "assets/images/gallery/g15.jpg", images: ["assets/images/gallery/g15.jpg", "assets/images/products/metal-ceiling.jpg", "assets/images/gallery/g13.jpg"], price: "Rs. 34", unit: "/Square Feet", description: "Mineral fiber ceiling tiles for acoustic comfort and easy maintenance.", specs: { "Material": "Mineral fiber", "Tile Type": "Grid ceiling tile" } }),
            necProduct({ id: "metal-false-ceiling", name: "Metal False Ceiling", image: "assets/images/products/metal-ceiling.jpg", price: "Rs. 40", unit: "/Square Feet", description: "Metal false ceiling for commercial corridors and industrial interiors.", specs: { "Material": "Metal ceiling panel", "Finish": "Plain / perforated" } }),
            necProduct({ id: "roofing-solutions", name: "Roofing Solutions", image: "assets/images/gallery/g2.jpg", price: "Price on request", description: "Metal roofing and ceiling integrated solutions for industrial and commercial sheds.", specs: { "Type": "Roofing & ceiling", "Material": "Metal sheet systems" } }),
            necProduct({ id: "interior-ceiling-solutions", name: "Interior Ceiling Solutions", image: "assets/images/gallery/g14.jpg", price: "Price on request", description: "Complete interior metal ceiling packages with grids, trims and accessories.", specs: { "Type": "Interior ceiling package", "Usage/Application": "Offices and commercial interiors" } })
        ]
    },
    {
        id: "air-louver",
        name: "Air Louver",
        intro: "Aluminum, GI and metal louver solutions for fresh air flow, ventilation and exterior protection.",
        products: [
            necProduct({ id: "fresh-air-louvers", name: "Fresh Air Louvers", image: "assets/images/products/air-louver.jpg", price: "Rs. 140", unit: "/Square Feet", description: "Fresh air louver systems for intake ventilation in commercial and industrial buildings.", specs: { "Type": "Fresh air louver", "Material": "Aluminum / GI" } }),
            necProduct({ id: "aluminum-air-louvers", name: "Aluminum Air Louvers", image: "assets/images/gallery/g16.jpg", price: "Rs. 150", unit: "/Square Feet", description: "Aluminum air louvers for durable exterior ventilation and facade openings.", specs: { "Material": "Aluminum", "Usage/Application": "Ventilation and facade" } }),
            necProduct({ id: "gi-air-louvers", name: "GI Air Louvers", image: "assets/images/products/air-louver.jpg", price: "Rs. 130", unit: "/Square Feet", description: "Galvanized iron air louvers for industrial plants and utility areas.", specs: { "Material": "G.I.", "Usage/Application": "Industrial ventilation" } })
        ]
    },
    {
        id: "ceiling-insulation-service",
        name: "Ceiling Insulation Service",
        intro: "Providing you the best range of ceiling insulation services with effective and timely delivery.",
        products: [
            necProduct({
                id: "ceiling-insulation",
                name: "Ceiling Insulation Service",
                image: "assets/images/products/acoustic-partition.jpg",
                images: ["assets/images/products/acoustic-partition.jpg", "assets/images/products/false-ceiling.jpg", "assets/images/products/metal-ceiling.jpg"],
                price: "Rs. 14",
                unit: "/Square Feet",
                description: "Professional thermal and noise insulation for offices, commercial interiors and industrial sheds.",
                specs: { "Insulation Type": "Thermal, Noise insulation", "Insulation Material": "Rockwool, Glass wool, Nitrile rubber", "Usage/Application": "Commercial and industrial ceiling" }
            })
        ]
    },
    {
        id: "acoustic-partitions",
        name: "Acoustic Partitions",
        intro: "Sound-control partition and panel solutions for offices, meeting rooms and commercial interiors.",
        products: [
            necProduct({ id: "acoustic-partition", name: "Acoustic Partition", image: "assets/images/products/acoustic-partition.jpg", images: ["assets/images/products/acoustic-partition.jpg", "assets/images/gallery/g8.jpg", "assets/images/products/wall-partition.jpg"], price: "Rs. 240", unit: "/Square Feet", description: "Acoustic partitions to reduce sound transfer with professional finish.", specs: { "Material": "Acoustic panels", "Feature": "Sound control" } }),
            necProduct({ id: "perforated-acoustic-panels", name: "Perforated Acoustic Panels", image: "assets/images/gallery/g8.jpg", price: "Rs. 260", unit: "/Square Feet", description: "Perforated acoustic panels for auditoriums, meeting rooms and open offices.", specs: { "Type": "Perforated acoustic panel", "Feature": "Enhanced sound absorption" } })
        ]
    },
    {
        id: "painting-service",
        name: "Painting Service",
        intro: "Industrial and commercial floor & surface painting services including epoxy and protective coatings.",
        products: [
            necProduct({
                id: "epoxy-floor-painting",
                name: "Epoxy Floor Painting",
                image: "assets/images/products/flooring.jpg",
                images: ["assets/images/products/flooring.jpg", "assets/images/gallery/g5.jpg", "assets/images/photo/g1.jpg"],
                price: "Rs. 35",
                unit: "/Square Feet",
                description: "Epoxy floor painting for factories, warehouses, parking and heavy-duty commercial floors.",
                specs: { "Coating Type": "Epoxy floor coating", "Feature": "Chemical resistant, durable finish", "Usage/Application": "Industrial and commercial flooring" }
            })
        ]
    },
    {
        id: "gypsum-partitions",
        name: "Gypsum Partitions",
        intro: "Gypsum-based partition systems for quick installation and smooth interior finishes.",
        products: [
            necProduct({
                id: "gypsum-partition",
                name: "Gypsum Partition",
                image: "assets/images/gallery/g7.jpg",
                images: ["assets/images/gallery/g7.jpg", "assets/images/products/wall-partition.jpg", "assets/images/gallery/g9.jpg"],
                price: "Rs. 88",
                unit: "/Square Feet",
                description: "Gypsum partition walls for offices and commercial spaces with neat joints and paint-ready surfaces.",
                specs: { "Material": "Gypsum partition board", "Frame": "GI stud system", "Usage/Application": "Office and commercial interiors" }
            })
        ]
    }
];
