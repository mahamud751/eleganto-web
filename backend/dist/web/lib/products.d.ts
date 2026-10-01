export type Category = {
    slug: string;
    name: string;
    blurb: string;
    cover: string;
};
export type Product = {
    slug: string;
    name: string;
    price: number;
    category: string;
    color: {
        name: string;
        hex: string;
    };
    images: string[];
    tags: ("trending" | "best" | "must" | "new")[];
    fabric: string;
    details: string[];
};
export declare const categories: Category[];
export declare const products: Product[];
export declare const lookbook: string[];
export declare const SIZES: readonly ["S", "M", "L", "XL", "2XL"];
export declare function getProduct(slug: string): Product | undefined;
export declare function byTag(tag: Product["tags"][number]): Product[];
export declare function getCategory(slug: string): Category | undefined;
