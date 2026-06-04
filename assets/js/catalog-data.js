/* NECI service catalog: portfolio-led categories and service offerings */

function necProduct(cfg) {
    var base = {
        id: cfg.id,
        name: cfg.name,
        image: cfg.image,
        images: cfg.images || [cfg.image, "assets/images/gallery/g1.jpg", "assets/images/gallery/g2.jpg"],
        price: cfg.price || "Inquiry for best quote",
        unit: cfg.unit || "",
        moq: cfg.moq || "As per project requirement",
        description: cfg.description || "",
        specs: cfg.specs || {}
    };

    if (!base.specs["Service Location"]) {
        base.specs["Service Location"] = "Pan India";
    }

    if (!base.specs.Features) {
        base.specs.Features = cfg.features || "Precision installation, premium finish and project-ready detailing";
    }

    if (!base.specs.Benefits) {
        base.specs.Benefits = cfg.benefits || "Durable performance, clean aesthetics and dependable execution";
    }

    return base;
}

var serviceCatalog = [
    {
        id: "false-flooring-service-cat",
        name: "False Flooring Service",
        intro: "Raised access flooring and technical floor solutions for modern offices and data centers.",
        products: [
            necProduct({
                id: "false-flooring",
                name: "False Flooring Service",
                image: "assets/images/products/flooring.jpg",
                description: "Professional installation of raised access floors for cable management and airflow.",
                specs: { "Type": "Raised Access", "Application": "Server rooms, Offices", "Features": "Easy access, high load capacity" }
            }),
            necProduct({
                id: "access-flooring-svc",
                name: "Access Flooring Service",
                image: "assets/images/products/flooring.jpg",
                description: "Versatile access flooring systems for flexible workspace planning.",
                specs: { "Material": "Steel/Cementitious", "Benefit": "Modular flexibility" }
            })
        ]
    },
    {
        id: "false-ceiling-cat",
        name: "False Ceiling",
        intro: "A wide range of architectural ceiling systems for commercial and aesthetic excellence.",
        products: [
            necProduct({ id: "aluminum-false-ceiling", name: "Aluminum False Ceiling", image: "assets/images/products/metal-ceiling.jpg", description: "Durable and lightweight aluminum ceiling systems." }),
            necProduct({ id: "metal-false-ceiling-svc", name: "Metal False Ceiling", image: "assets/images/products/metal-ceiling.jpg", description: "Premium metal tiles and panels for high-traffic zones." }),
            necProduct({ id: "gypsum-board-false-ceiling", name: "Gypsum Board False Ceiling", image: "assets/images/products/gypsum-ceiling.jpg", description: "Seamless gypsum board ceilings for elegant interior finishes." }),
            necProduct({ id: "gypsum-false-ceiling", name: "Gypsum False Ceiling", image: "assets/images/products/gypsum-ceiling.jpg", description: "Standard gypsum tile systems for efficient execution." }),
            necProduct({ id: "linear-false-ceiling", name: "Linear False Ceiling", image: "assets/images/products/linear-ceiling.jpg", description: "Architectural linear profiles for directional design." }),
            necProduct({ id: "mineral-fiber-ceiling-svc", name: "Mineral Fiber Ceiling Tiles", image: "assets/images/products/mineral-fiber-ceiling.jpg", description: "Acoustic mineral fiber tiles for office environments." }),
            necProduct({ id: "baffle-ceiling", name: "Baffle Ceiling", image: "assets/images/products/baffle-ceiling.jpg", description: "Open baffle systems for modern industrial aesthetics." }),
            necProduct({ id: "mesh-ceiling", name: "Mesh Ceiling", image: "assets/images/products/mesh-ceiling.jpg", description: "Expanded metal mesh ceilings for breathable interiors." }),
            necProduct({ id: "designer-false-ceiling", name: "Designer False Ceiling", image: "assets/images/products/designer-ceiling.jpg", description: "Custom-shaped designer ceilings for feature areas." })
        ]
    },
    {
        id: "wall-partitions-cat",
        name: "Wall Partitions",
        intro: "Smart space division with gypsum, glass, and specialized acoustic partitions.",
        products: [
            necProduct({ id: "glass-wall-partitions", name: "Glass Wall Partitions", image: "assets/images/products/glass-partition.jpg", description: "Frameless and framed glass partitions for transparency and style." }),
            necProduct({ id: "gypsum-wall-partitions", name: "Gypsum Wall Partitions", image: "assets/images/products/gypsum-partition.jpg", description: "Solid gypsum partitions for privacy and thermal control." }),
            necProduct({ id: "fire-rated-partition-svc", name: "Fire Rated Partition", image: "assets/images/products/fire-rated-partition.jpg", description: "Certified fire-resistant systems for safety compliance." }),
            necProduct({ id: "acoustic-partition-svc", name: "Acoustic Partition", image: "assets/images/products/acoustic-partition.jpg", description: "Sound-dampening partitions for quiet workspaces." }),
            necProduct({ id: "office-cabin-partition", name: "Office Cabin Partition", image: "assets/images/products/office-partition.jpg", description: "Quick-install cabin solutions for corporate offices." }),
            necProduct({ id: "modular-partition", name: "Modular Partition", image: "assets/images/products/wall-partition.jpg", description: "Flexible modular systems for evolving layouts." })
        ]
    },
    {
        id: "metal-sun-louvers-cat",
        name: "Metal Sun Louvers",
        intro: "Solar control and architectural facade enhancement using premium metal louvers.",
        products: [
            necProduct({ id: "hunter-douglas-louvers", name: "Hunter Douglas Metal Louvers", image: "assets/images/products/air-louver.jpg", description: "World-class solar shading systems from Hunter Douglas." }),
            necProduct({ id: "metal-sun-louvers-std", name: "Metal Sun Louvers", image: "assets/images/products/metal-louver.jpg", description: "Engineered metal louvers for exterior sun protection." })
        ]
    },
    {
        id: "metal-ceiling-main",
        name: "Metal Ceiling",
        intro: "Specialized metal ceiling tiles and roofing solutions for industrial and commercial use.",
        products: [
            necProduct({ id: "mineral-fiber-metal", name: "Mineral Fiber Ceiling Tiles", image: "assets/images/products/mineral-fiber-ceiling.jpg", description: "High-performance acoustic ceiling tiles." }),
            necProduct({ id: "metal-false-ceiling-main", name: "Metal False Ceiling", image: "assets/images/products/metal-ceiling.jpg", description: "Standard metal tile systems for durable utility." }),
            necProduct({ id: "roofing-solutions", name: "Roofing Solutions", image: "assets/images/products/roofing.jpg", description: "Industrial and commercial roofing installation services." }),
            necProduct({ id: "ceiling-tiles-svc", name: "Ceiling Tiles", image: "assets/images/products/ceiling-tile.jpg", description: "Versatile ceiling tile options for diverse project needs." })
        ]
    },
    {
        id: "air-louver-cat",
        name: "Air Louver",
        intro: "Ventilation louvers designed for industrial plants and commercial utility rooms.",
        products: [
            necProduct({ id: "fresh-air-louvers", name: "Fresh Air Louvers", image: "assets/images/products/air-louver.jpg", description: "Designed for optimal airflow and weather protection." }),
            necProduct({ id: "aluminum-air-louvers", name: "Aluminum Air Louvers", image: "assets/images/products/air-louver.jpg", description: "Corrosion-resistant aluminum louvers for exterior walls." }),
            necProduct({ id: "gi-air-louvers-svc", name: "GI Air Louvers", image: "assets/images/products/air-louver.jpg", description: "Rugged GI louvers for heavy-duty industrial ventilation." })
        ]
    },
    {
        id: "ceiling-insulation-cat",
        name: "Ceiling Insulation Service",
        intro: "Thermal and acoustic insulation for improved building efficiency.",
        products: [
            necProduct({
                id: "insulation-service",
                name: "Ceiling Insulation Service",
                image: "assets/images/products/ceiling-insulation.jpg",
                description: "Professional insulation layer installation above false ceilings."
            })
        ]
    },
    {
        id: "acoustic-partitions-cat",
        name: "Acoustic Partitions",
        intro: "High-performance sound control solutions for auditoriums and meeting rooms.",
        products: [
            necProduct({ id: "acoustic-partition-main", name: "Acoustic Partition", image: "assets/images/products/acoustic-partition.jpg", description: "Soundproof partitions with high STC ratings." }),
            necProduct({ id: "perforated-panels-svc", name: "Perforated Acoustic Panels", image: "assets/images/products/perforated-panel.jpg", description: "Perforated metal or gypsum panels for superior sound absorption." })
        ]
    },
    {
        id: "painting-service-cat",
        name: "Painting Service",
        intro: "Specialized industrial and commercial painting services.",
        products: [
            necProduct({ id: "epoxy-painting-svc", name: "Epoxy Floor Painting", image: "assets/images/products/epoxy-painting.jpg", description: "Durable epoxy coatings for high-performance industrial floors." })
        ]
    },
    {
        id: "gypsum-partitions-main",
        name: "Gypsum Partitions",
        intro: "Quick and cost-effective wall systems using premium gypsum boards.",
        products: [
            necProduct({ id: "gypsum-partition-main", name: "Gypsum Partition", image: "assets/images/products/gypsum-partition.jpg", description: "Lightweight wall partitions for office interiors and cabins." })
        ]
    },
];
