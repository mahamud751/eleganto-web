"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SIZES = exports.lookbook = exports.products = exports.categories = void 0;
exports.getProduct = getProduct;
exports.byTag = byTag;
exports.getCategory = getCategory;
exports.categories = [
    {
        slug: "acid-wash",
        name: "Acid Wash Tees",
        blurb: "Hand-finished stone wash, every piece slightly different.",
        cover: "/images/look-stairs-duo.jpg",
    },
    {
        slug: "oversized",
        name: "Oversized Graphic Tees",
        blurb: "Drop shoulder, heavyweight, statement back prints.",
        cover: "/images/porsche-back.jpg",
    },
    {
        slug: "essentials",
        name: "Essentials",
        blurb: "Clean everyday pieces built to layer.",
        cover: "/images/process-stripes.jpg",
    },
];
const img = (n) => `/images/${n}.jpg`;
const ACID = { name: "Acid Black", hex: "#3a3a3a" };
const BLACK = { name: "Jet Black", hex: "#0b0b0b" };
const acidDetails = [
    "Oversized drop-shoulder silhouette",
    "Acid / stone wash finish — each piece has a unique pattern",
    "Heavyweight 100% cotton, 240 GSM",
    "High-density screen print that won't crack",
    "Ribbed crew neck that keeps its shape",
];
const oversizedDetails = [
    "Relaxed oversized fit with dropped shoulders",
    "Heavyweight 100% combed cotton",
    "Soft, breathable & durable",
    "Premium back print with front chest detail",
    "Pairs with cargos, denim, or wide-leg trousers",
];
exports.products = [
    {
        slug: "the-queen-acid-wash",
        name: "The Queen Acid Wash Tee",
        price: 1250,
        category: "acid-wash",
        color: ACID,
        images: [img("queen-back-caution"), img("queen-back-star"), img("queen-front-selfie"), img("queen-selfie-2")],
        tags: ["trending", "best", "new"],
        fabric: "Heavyweight acid wash cotton",
        details: acidDetails,
    },
    {
        slug: "star-girl-acid-wash",
        name: "Star Girl Acid Wash Tee",
        price: 1250,
        category: "acid-wash",
        color: ACID,
        images: [img("star-girl-front"), img("star-girl-poster")],
        tags: ["trending", "must", "new"],
        fabric: "Heavyweight acid wash cotton",
        details: acidDetails,
    },
    {
        slug: "one-star-acid-wash",
        name: "One Star Acid Wash Tee",
        price: 1250,
        category: "acid-wash",
        color: ACID,
        images: [img("one-star-back"), img("one-star-collage"), img("one-star-rec")],
        tags: ["trending", "best", "new"],
        fabric: "Heavyweight acid wash cotton",
        details: acidDetails,
    },
    {
        slug: "need-money-for-porsche",
        name: "Need Money For Porsche",
        price: 990,
        category: "oversized",
        color: BLACK,
        images: [img("porsche-back"), img("porsche-front")],
        tags: ["trending", "must", "new"],
        fabric: "Heavyweight combed cotton",
        details: oversizedDetails,
    },
    {
        slug: "love-over-fear",
        name: "Love Over Fear",
        price: 990,
        category: "oversized",
        color: BLACK,
        images: [img("love-over-fear-back"), img("love-over-fear-mirror")],
        tags: ["trending", "best"],
        fabric: "Heavyweight combed cotton",
        details: oversizedDetails,
    },
    {
        slug: "pink-butterfly",
        name: "Pink Butterfly Tee",
        price: 990,
        category: "oversized",
        color: BLACK,
        images: [img("pink-butterfly-back")],
        tags: ["trending", "new"],
        fabric: "Heavyweight combed cotton",
        details: oversizedDetails,
    },
    {
        slug: "eleganto-stone-wash",
        name: "Eleganto Stone Wash Tee",
        price: 1150,
        category: "acid-wash",
        color: ACID,
        images: [img("acid-tunnel-front"), img("acid-tunnel-walk"), img("acid-tunnel-pose"), img("acid-nicer-sign"), img("acid-wall")],
        tags: ["best", "must"],
        fabric: "Heavyweight acid wash cotton",
        details: acidDetails,
    },
    {
        slug: "part-of-the-process",
        name: "Part Of The Process",
        price: 990,
        category: "essentials",
        color: BLACK,
        images: [img("process-stripes"), img("process-camera"), img("process-brick")],
        tags: ["best", "must"],
        fabric: "Heavyweight combed cotton",
        details: oversizedDetails,
    },
    {
        slug: "midnight-script-acid-wash",
        name: "Midnight Script Acid Wash",
        price: 1250,
        category: "acid-wash",
        color: ACID,
        images: [img("acid-graphic-back"), img("acid-tunnel-back"), img("acid-stairs-sit"), img("acid-stairs-rail")],
        tags: ["best", "must"],
        fabric: "Heavyweight acid wash cotton",
        details: acidDetails,
    },
    {
        slug: "red-box-graphic",
        name: "Red Box Graphic Tee",
        price: 990,
        category: "oversized",
        color: BLACK,
        images: [img("red-box-mirror")],
        tags: ["best"],
        fabric: "Heavyweight combed cotton",
        details: oversizedDetails,
    },
    {
        slug: "eleganto-essential-black",
        name: "Eleganto Essential Black",
        price: 850,
        category: "essentials",
        color: BLACK,
        images: [img("essential-front"), img("essential-mesh"), img("essential-bench")],
        tags: ["must"],
        fabric: "Heavyweight combed cotton",
        details: [
            "Clean oversized silhouette with small chest logo",
            "Heavyweight 100% combed cotton",
            "Structured neckline with premium rib",
            "Minimal design for versatile styling",
        ],
    },
    {
        slug: "cloud-white-graphic",
        name: "Cloud White Graphic Tee",
        price: 990,
        category: "essentials",
        color: { name: "Off White", hex: "#f1efe9" },
        images: [img("white-graphic")],
        tags: ["must", "new"],
        fabric: "Heavyweight combed cotton",
        details: oversizedDetails,
    },
];
exports.lookbook = [
    img("look-stairs-duo"),
    img("look-twins"),
    img("look-duo"),
    img("look-airdrop"),
    img("look-no-sign"),
    img("queen-back-caution"),
    img("star-girl-poster"),
    img("porsche-back"),
    img("love-over-fear-mirror"),
    img("process-brick"),
    img("red-box-mirror"),
    img("acid-stairs-sit"),
];
exports.SIZES = ["S", "M", "L", "XL", "2XL"];
function getProduct(slug) {
    return exports.products.find((p) => p.slug === slug);
}
function byTag(tag) {
    return exports.products.filter((p) => p.tags.includes(tag));
}
function getCategory(slug) {
    return exports.categories.find((c) => c.slug === slug);
}
//# sourceMappingURL=products.js.map