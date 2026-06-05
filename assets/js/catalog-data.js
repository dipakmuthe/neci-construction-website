/* NECI service catalog: portfolio-led categories and service offerings */

function necProduct(cfg) {
    var base = {
        id: cfg.id,
        name: cfg.name,
        image: cfg.image,
        images: cfg.images || [cfg.image, "assets/images/products/false-ceiling.jpg", "assets/images/products/flooring.jpg"],
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
        name: "False Flooring",
        intro: "Raised access flooring and technical floor solutions for modern offices and data centers.",
        products: [
            necProduct({
                id: "false-flooring",
                name: "False Flooring Service",
                image: "assets/images/products/access-false-flooring-service-500x500.jpg",
                description: "Professional supply and installation of premium raised access false floors for clean cable management, underfloor air systems, and static control.",
                specs: { "Type": "Raised Access Grid", "Application": "Data centers, server rooms, control rooms, modern office corridors", "Material": "Steel Cementitious / Calcium Silicate Panel", "MOQ": "500 Sq. Ft." }
            }),
            necProduct({
                id: "access-flooring-svc",
                name: "Access Flooring Service",
                image: "assets/images/products/unilock-false-flooring-500x500.jpg",
                description: "Versatile modular access flooring solutions for dynamic workspaces, providing flexible cable routing and convenient utility access panels.",
                specs: { "Material": "Steel / Wood-Core / Glass-Panel", "Benefit": "100% modular flexibility, easily reconfigurable, high structural load-bearing capacity" }
            })
        ]
    },
    {
        id: "false-ceiling-cat",
        name: "False Ceiling",
        intro: "A wide range of architectural ceiling systems for commercial and aesthetic excellence.",
        products: [
            necProduct({ 
                id: "aluminum-false-ceiling", 
                name: "Aluminum False Ceiling", 
                image: "assets/images/products/aluminum-false-ceiling-500x500.jpg", 
                description: "Premium grade corrosion-resistant aluminum ceiling panels and tiles, offering lightweight structural loads and a modern aesthetic finish." 
            }),
            necProduct({ 
                id: "metal-false-ceiling-svc", 
                name: "Metal False Ceiling", 
                image: "assets/images/products/metal-false-ceiling-500x500.jpg", 
                description: "Highly durable metal lay-in and clip-in ceiling tile systems, engineered for high-traffic environments, hospitals, and transit spaces." 
            }),
            necProduct({ 
                id: "gypsum-board-false-ceiling", 
                name: "Gypsum Board False Ceiling", 
                image: "assets/images/products/gypsum-board-false-ceiling-500x500.jpg", 
                description: "Seamless gypsum plasterboard ceiling design, ideal for luxury office receptions, conference rooms, and commercial feature areas." 
            }),
            necProduct({ 
                id: "gypsum-false-ceiling", 
                name: "Gypsum False Ceiling", 
                image: "assets/images/products/gypsum-false-ceiling-500x500.jpg", 
                description: "Standard modular gypsum tile false ceilings on visible grid systems, providing quick installation and convenient above-ceiling service access." 
            }),
            necProduct({ 
                id: "armstrong-false-ceiling", 
                name: "Armstrong False Ceiling", 
                image: "assets/images/products/armstrong-false-ceiling-500x500.jpg", 
                description: "Authentic Armstrong acoustics mineral fiber tile ceiling systems. Excellent noise reduction coefficient (NRC) and high light reflectance." 
            }),
            necProduct({ 
                id: "mineral-fiber-ceiling-svc", 
                name: "Mineral Fiber Ceiling Tiles", 
                image: "assets/images/products/mineral-fibre-tiles-ceiling-500x500.jpg", 
                description: "Acoustic ceiling tiles made of mineral wool, clay, and starch. Ideal for corporate office floors, call centers, and schools." 
            }),
            necProduct({ 
                id: "baffle-ceiling", 
                name: "Baffle Ceiling", 
                image: "assets/images/products/aluminium-baffle-ceiling-500x500.jpg", 
                description: "Linear metal or acoustic baffle ceiling designs that create modern, open, and spacious architectural environments with optimal sound dampening." 
            }),
            necProduct({ 
                id: "mesh-ceiling", 
                name: "Mesh Ceiling", 
                image: "assets/images/products/aluminum-ceiling-500x500.jpg", 
                description: "Expanded metal mesh lay-in panels that allow air circulation, HVAC integration, and raw industrial aesthetics." 
            }),
            necProduct({ 
                id: "designer-false-ceiling", 
                name: "Designer False Ceiling", 
                image: "assets/images/products/false-ceiling.jpg", 
                description: "Custom geometric and curved architectural ceiling installations, combining premium gypsum, wood elements, and integrated ring lighting designs." 
            }),
            necProduct({ 
                id: "calcium-silicate-ceiling", 
                name: "Calcium Silicate Ceiling", 
                image: "assets/images/products/calcium-silicate-false-ceiling-500x500.jpg", 
                description: "Moisture-resistant, fireproof calcium silicate tiles, perfect for laboratories, kitchens, industrial facilities, and washroom ceilings." 
            }),
            necProduct({ 
                id: "grid-ceiling", 
                name: "Grid Ceiling", 
                image: "assets/images/products/armstrong-metal-false-ceiling-500x500.jpg", 
                description: "Standard 2x2 exposed T-grid ceiling systems, serving as the functional foundation for modern commercial office lighting and HVAC diffusers." 
            }),
            necProduct({ 
                id: "pvc-false-ceiling", 
                name: "PVC False Ceiling", 
                image: "assets/images/products/linear-false-ceiling-500x500.jpg", 
                description: "Waterproof, light, and low-maintenance PVC ceiling panels, suitable for humid spaces, residential kitchens, corridors, and balconies." 
            }),
            necProduct({ 
                id: "office-false-ceiling", 
                name: "Office False Ceiling", 
                image: "assets/images/products/false-ceilings-for-office-500x500.jpg", 
                description: "Optimized corporate office ceiling solutions combining acoustic grid zones and drywall border elements to enhance comfort and workspace focus." 
            })
        ]
    },
    {
        id: "wall-partitions-cat",
        name: "Wall Partitions",
        intro: "Smart space division with gypsum, glass, and specialized acoustic partitions.",
        products: [
            necProduct({ 
                id: "glass-wall-partitions", 
                name: "Glass Wall Partitions", 
                image: "assets/images/products/glass-wall-partitions-500x500.jpg", 
                description: "Frameless and framed double-glazed glass partition systems, delivering premium corporate aesthetics, natural light transmission, and high acoustic isolation." 
            }),
            necProduct({ 
                id: "gypsum-wall-partitions", 
                name: "Gypsum Wall Partitions", 
                image: "assets/images/products/gypsum-wall-partitions-500x500.jpg", 
                description: "Solid, durable gypsum drywall partitions mounted on lightweight metal frames, ready for high-quality paint, wallpaper, or laminate finishes." 
            }),
            necProduct({ 
                id: "fire-rated-partition-svc", 
                name: "Fire Rated Partition", 
                image: "assets/images/products/fire-rated-partition-500x500.jpg", 
                description: "Certified fire-resistant partition walls engineered with specialized mineral board layers to contain thermal transfers and conform to safety codes." 
            }),
            necProduct({ 
                id: "acoustic-partition-svc", 
                name: "Acoustic Partition", 
                image: "assets/images/products/acoustic-partition-500x500.jpg", 
                description: "Soundproof divider walls packed with high-density acoustic insulation slabs to ensure speech privacy between adjacent cabins and meeting rooms." 
            }),
            necProduct({ 
                id: "office-partition", 
                name: "Office Partition", 
                image: "assets/images/products/glass-partition-500x500.jpg", 
                description: "Modular workstation dividers, privacy screens, and workspace demountable partition systems, designed to structure open office layouts." 
            }),
            necProduct({ 
                id: "modular-partition", 
                name: "Modular Partition", 
                image: "assets/images/products/wall-partition.jpg", 
                description: "Easily demountable partition walls for rapidly changing commercial layout configurations, allowing fast installation and minimum waste." 
            })
        ]
    },
    {
        id: "metal-sun-louvers-cat",
        name: "Metal Sun Louvers",
        intro: "Solar control and architectural facade enhancement using premium metal louvers.",
        products: [
            necProduct({ 
                id: "hunter-douglas-louvers", 
                name: "Hunter Douglas Metal Louvers", 
                image: "assets/images/products/hunter-douglas-louvers-500x500.jpg", 
                description: "World-class solar shading panels from Hunter Douglas. Architectural external sun control systems combining wind stability, solar efficiency, and facade design." 
            }),
            necProduct({ 
                id: "metal-sun-louvers-std", 
                name: "Metal Sun Louvers", 
                image: "assets/images/products/metal-louvers-500x500.jpg", 
                description: "Engineered aluminum or steel exterior sun louvers, offering weather shielding, ventilation, and direct solar glare protection." 
            }),
            necProduct({ 
                id: "kitchen-louver-window", 
                name: "Kitchen Louver Window", 
                image: "assets/images/products/aluminum-louvers-500x500.jpg", 
                description: "Adjustable and fixed metal louver assemblies for utility vents, kitchen windows, and exhaust fans, offering continuous airflow and privacy." 
            })
        ]
    },
    {
        id: "metal-ceiling-main",
        name: "Metal Ceiling",
        intro: "Specialized metal ceiling tiles and roofing solutions for industrial and commercial use.",
        products: [
            necProduct({ 
                id: "mineral-fiber-metal", 
                name: "Metal Ceiling", 
                image: "assets/images/products/metal-ceiling-500x500.jpg", 
                description: "Premium perforated metal ceiling tile options with acoustic fleece backing to absorb echo and sound bounce in public spaces, airports, and commercial halls." 
            }),
            necProduct({ 
                id: "roofing-solutions", 
                name: "Roofing Solutions", 
                image: "assets/images/products/roofing-solutions.jpg", 
                description: "Industrial profile sheet roofing installations, structural steel deck sheeting, and rainwater gutter fabrication services." 
            }),
            necProduct({ 
                id: "ceiling-tiles-svc", 
                name: "Ceiling Tiles", 
                image: "assets/images/products/aluminum-ceiling-500x500.jpg", 
                description: "Commercial ceiling tile catalog, covering lightweight aluminum, powder-coated GI, and specialized composite tiles." 
            })
        ]
    },
    {
        id: "air-louver-cat",
        name: "Air Louver",
        intro: "Ventilation louvers designed for industrial plants and commercial utility rooms.",
        products: [
            necProduct({ id: "fresh-air-louvers", name: "Fresh Air Louvers", image: "assets/images/products/fresh-air-louver-500x500.jpg", description: "Specifically designed intake louvers, restricting rain ingress while maintaining maximum fresh air intake volumes." }),
            necProduct({ id: "aluminum-air-louvers", name: "Aluminum Air Louvers", image: "assets/images/products/aluminum-air-louver-500x500.jpg", description: "Corrosion-proof, lightweight aluminum louvers for exterior wall integrations, featuring bird screens and insect meshes." }),
            necProduct({ id: "gi-air-louvers-svc", name: "GI Air Louvers", image: "assets/images/products/air-louver.jpg", description: "Heavy-duty galvanized iron (GI) ventilation air louvers, built to withstand harsh industrial plant conditions." })
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
                image: "assets/images/products/insulation-500x500.jpg",
                description: "Under-deck and over-ceiling insulation services using glasswool, rockwool, or XLPE rolls to minimize thermal conduction and transfer sound transmission."
            })
        ]
    },
    {
        id: "acoustic-partitions-cat",
        name: "Acoustic Partitions",
        intro: "High-performance sound control solutions for auditoriums and meeting rooms.",
        products: [
            necProduct({ id: "acoustic-partition-main", name: "Acoustic Partition", image: "assets/images/products/acoustic-partition-500x500.jpg", description: "High STC (Sound Transmission Class) certified acoustic panels and folding partition walls for auditorium, boardrooms, and convention spaces." }),
            necProduct({ id: "perforated-panels-svc", name: "Perforated Acoustic Panels", image: "assets/images/products/perforated-acoustic-panels-500x500.jpg", description: "Wall and ceiling perforated panels lined with acoustic fabric to deliver absorption, controlling reverb and echo." })
        ]
    },
    {
        id: "painting-service-cat",
        name: "Painting Service",
        intro: "Specialized industrial and commercial painting services.",
        products: [
            necProduct({ id: "epoxy-painting-svc", name: "Epoxy Floor Painting", image: "assets/images/products/epoxy-flooring-500x500.jpg", description: "Multi-layered heavy-duty epoxy coating and polyurethane self-leveling flooring, providing dust-free, seamless, and chemically resistant surfaces for industries." })
        ]
    },
    {
        id: "gypsum-partitions-main",
        name: "Gypsum Partitions",
        intro: "Quick and cost-effective wall systems using premium gypsum boards.",
        products: [
            necProduct({ id: "gypsum-partition-main", name: "Gypsum Partition", image: "assets/images/products/gypsum-partition-500x500.jpg", description: "Lightweight interior drywalls utilizing Gyproc gypsum boards on GI frames, providing partition separation for executive cabins, server rooms, and pantries." })
        ]
    },
    {
        id: "renovation-construction-cat",
        name: "Renovation & Construction",
        intro: "Allied contracting, structural steel fabrications, and interior renovation services.",
        products: [
            necProduct({
                id: "interior-renovation-svc",
                name: "Interior Renovation Service",
                image: "assets/images/products/interior-renovation-service.jpg",
                description: "End-to-end office and commercial space renovation contracting, encompassing ceilings, flooring, cabling, and interior partitioning works."
            }),
            necProduct({
                id: "flat-interior-renovation-svc",
                name: "Flat Interior Renovation Service",
                image: "assets/images/products/flat-interior-renovation-service.jpg",
                description: "Premium interior refurbishment and modernization contracting for high-end residential flats, penthouses, and guest houses."
            }),
            necProduct({
                id: "residential-construction-svc",
                name: "Residential Construction Service",
                image: "assets/images/products/residential-construction-service.jpg",
                description: "Turnkey residential civil construction contracting, managed by skilled engineers from foundation works to finish painting."
            }),
            necProduct({
                id: "steel-buildings",
                name: "Steel Buildings",
                image: "assets/images/products/steel-buildings.jpg",
                description: "Design, supply, and erection of structural steel Pre-Engineered Buildings (PEB) for industrial sheds, warehouses, and factories."
            }),
            necProduct({
                id: "erection-services",
                name: "Erection Services",
                image: "assets/images/products/erection-services.jpg",
                description: "Precision heavy structural steel assembly, metal frame erections, and composite panel site alignment services."
            }),
            necProduct({
                id: "welding-fabrication-svc",
                name: "Welding Fabrication Service",
                image: "assets/images/products/welding-fabrication.jpg",
                description: "Industrial welding and metal structural fabrications for platforms, staircases, and heavy machinery supports."
            }),
            necProduct({
                id: "roof-fabrication-svc",
                name: "Roof Fabrication Service",
                image: "assets/images/products/roof-fabrication-service.jpg",
                description: "Structural roof truss fabrication and profile metal sheeting installation contracting for industrial hangars and plant sheds."
            })
        ]
    }
];
