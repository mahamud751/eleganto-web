(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/admin/components/product-manager.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImagePlus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image-plus.js [app-client] (ecmascript) <export default as ImagePlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pencil.js [app-client] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$admin$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/admin/lib/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const blank = {
    name: '',
    slug: '',
    price: 0,
    category: 'oversized',
    inventory: 0,
    published: true,
    colorName: 'Jet Black',
    colorHex: '#0b0b0b',
    colorsText: 'Jet Black|#0b0b0b',
    sizesText: 'S, M, L, XL, 2XL',
    imagesText: '',
    tagsText: 'new',
    fabric: 'Heavyweight cotton',
    detailsText: 'Premium quality'
};
const prepare = (p)=>({
        ...p,
        colorsText: (p.colors?.length ? p.colors : [
            {
                name: p.colorName,
                hex: p.colorHex
            }
        ]).map((c)=>`${c.name}|${c.hex}`).join('\n'),
        sizesText: (p.sizes || [
            'S',
            'M',
            'L',
            'XL',
            '2XL'
        ]).join(', '),
        imagesText: (p.images || []).join('\n'),
        tagsText: (p.tags || []).join(', '),
        detailsText: (p.details || []).join('\n')
    });
function ProductManager({ initial }) {
    _s();
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initial);
    const [editing, setEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [uploading, setUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const set = (key, value)=>setEditing((current)=>({
                ...current,
                [key]: value
            }));
    const save = async (e)=>{
        e.preventDefault();
        setError('');
        const raw = Object.fromEntries(new FormData(e.currentTarget));
        const colors = String(editing.colorsText).split('\n').map((row)=>{
            const [name, hex] = row.split('|').map((x)=>x.trim());
            return {
                name,
                hex
            };
        }).filter((c)=>c.name && /^#[0-9a-f]{6}$/i.test(c.hex));
        if (!colors.length) {
            setError('Add at least one color using Name|#hex format.');
            return;
        }
        const images = String(editing.imagesText).split('\n').map((x)=>x.trim()).filter(Boolean);
        if (!images.length) {
            setError('Upload at least one product image.');
            return;
        }
        const body = {
            ...raw,
            price: Number(raw.price),
            inventory: Number(raw.inventory),
            published: raw.published === 'on',
            colorName: colors[0].name,
            colorHex: colors[0].hex,
            colors,
            sizes: String(editing.sizesText).split(',').map((x)=>x.trim()).filter(Boolean),
            images,
            tags: String(editing.tagsText).split(',').map((x)=>x.trim()).filter(Boolean),
            details: String(editing.detailsText).split('\n').map((x)=>x.trim()).filter(Boolean)
        };
        const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$admin$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API"]}/products${editing.id ? `/${editing.id}` : ''}`, {
            method: editing.id ? 'PATCH' : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            const data = await response.json().catch(()=>({}));
            setError(data.message || 'Could not save product. Check the slug is unique.');
            return;
        }
        const saved = await response.json();
        setItems((current)=>editing.id ? current.map((x)=>x.id === saved.id ? saved : x) : [
                saved,
                ...current
            ]);
        setEditing(null);
    };
    const upload = async (files)=>{
        if (!files?.length) return;
        setUploading(true);
        setError('');
        try {
            const urls = [];
            for (const file of Array.from(files)){
                const data = new FormData();
                data.append('file', file);
                const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$admin$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API"]}/uploads/image`, {
                    method: 'POST',
                    body: data
                });
                if (!response.ok) throw new Error('Upload failed. Use JPG, PNG, WEBP, or GIF under 8MB.');
                urls.push((await response.json()).url);
            }
            set('imagesText', [
                editing.imagesText,
                ...urls
            ].filter(Boolean).join('\n'));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Upload failed');
        } finally{
            setUploading(false);
        }
    };
    const removeImage = (url)=>set('imagesText', String(editing.imagesText).split('\n').filter((x)=>x.trim() !== url).join('\n'));
    const remove = async (id)=>{
        if (!confirm('Delete this product permanently?')) return;
        const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$admin$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API"]}/products/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) setItems((current)=>current.filter((x)=>x.id !== id));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-5 flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-bold",
                        children: [
                            items.length,
                            " products"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/admin/components/product-manager.tsx",
                        lineNumber: 16,
                        columnNumber: 68
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setEditing(blank),
                        className: "rounded-full bg-ink px-5 py-3 text-xs font-bold text-white",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                size: 15,
                                className: "mr-2 inline"
                            }, void 0, false, {
                                fileName: "[project]/admin/components/product-manager.tsx",
                                lineNumber: 16,
                                columnNumber: 241
                            }, this),
                            " Add product"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/admin/components/product-manager.tsx",
                        lineNumber: 16,
                        columnNumber: 128
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/admin/components/product-manager.tsx",
                lineNumber: 16,
                columnNumber: 12
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card overflow-x-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                    className: "w-full min-w-[820px] text-left text-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                className: "bg-[#fafaf8] text-[10px] font-bold tracking-[.16em] text-muted uppercase",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        className: "px-5 py-4",
                                        children: "Product"
                                    }, void 0, false, {
                                        fileName: "[project]/admin/components/product-manager.tsx",
                                        lineNumber: 16,
                                        columnNumber: 501
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        children: "Category"
                                    }, void 0, false, {
                                        fileName: "[project]/admin/components/product-manager.tsx",
                                        lineNumber: 16,
                                        columnNumber: 539
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        children: "Price"
                                    }, void 0, false, {
                                        fileName: "[project]/admin/components/product-manager.tsx",
                                        lineNumber: 16,
                                        columnNumber: 556
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        children: "Variants"
                                    }, void 0, false, {
                                        fileName: "[project]/admin/components/product-manager.tsx",
                                        lineNumber: 16,
                                        columnNumber: 570
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        children: "Stock"
                                    }, void 0, false, {
                                        fileName: "[project]/admin/components/product-manager.tsx",
                                        lineNumber: 16,
                                        columnNumber: 587
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        children: "Status"
                                    }, void 0, false, {
                                        fileName: "[project]/admin/components/product-manager.tsx",
                                        lineNumber: 16,
                                        columnNumber: 601
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                        children: "Actions"
                                    }, void 0, false, {
                                        fileName: "[project]/admin/components/product-manager.tsx",
                                        lineNumber: 16,
                                        columnNumber: 616
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/admin/components/product-manager.tsx",
                                lineNumber: 16,
                                columnNumber: 412
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/admin/components/product-manager.tsx",
                            lineNumber: 16,
                            columnNumber: 405
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                            children: items.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    className: "border-t border-line",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "px-5 py-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    p.images?.[0] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: p.images[0],
                                                        alt: "",
                                                        className: "size-12 rounded-lg object-cover"
                                                    }, void 0, false, {
                                                        fileName: "[project]/admin/components/product-manager.tsx",
                                                        lineNumber: 16,
                                                        columnNumber: 801
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "font-bold",
                                                                children: p.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/admin/components/product-manager.tsx",
                                                                lineNumber: 16,
                                                                columnNumber: 882
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-muted",
                                                                children: p.slug
                                                            }, void 0, false, {
                                                                fileName: "[project]/admin/components/product-manager.tsx",
                                                                lineNumber: 16,
                                                                columnNumber: 919
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/admin/components/product-manager.tsx",
                                                        lineNumber: 16,
                                                        columnNumber: 877
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/admin/components/product-manager.tsx",
                                                lineNumber: 16,
                                                columnNumber: 742
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/admin/components/product-manager.tsx",
                                            lineNumber: 16,
                                            columnNumber: 716
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            children: p.category
                                        }, void 0, false, {
                                            fileName: "[project]/admin/components/product-manager.tsx",
                                            lineNumber: 16,
                                            columnNumber: 982
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            children: [
                                                "৳",
                                                p.price.toLocaleString()
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/admin/components/product-manager.tsx",
                                            lineNumber: 16,
                                            columnNumber: 1003
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            className: "text-xs",
                                            children: [
                                                p.colors?.length || 1,
                                                " colors · ",
                                                p.sizes?.length || 5,
                                                " sizes"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/admin/components/product-manager.tsx",
                                            lineNumber: 16,
                                            columnNumber: 1039
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            children: p.inventory
                                        }, void 0, false, {
                                            fileName: "[project]/admin/components/product-manager.tsx",
                                            lineNumber: 16,
                                            columnNumber: 1129
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            children: p.published ? 'Published' : 'Draft'
                                        }, void 0, false, {
                                            fileName: "[project]/admin/components/product-manager.tsx",
                                            lineNumber: 16,
                                            columnNumber: 1151
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setEditing(prepare(p)),
                                                    className: "mr-2 rounded border border-line p-2",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                                        size: 14
                                                    }, void 0, false, {
                                                        fileName: "[project]/admin/components/product-manager.tsx",
                                                        lineNumber: 16,
                                                        columnNumber: 1296
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/admin/components/product-manager.tsx",
                                                    lineNumber: 16,
                                                    columnNumber: 1201
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>remove(p.id),
                                                    className: "rounded border border-red-200 p-2 text-red-600",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                        size: 14
                                                    }, void 0, false, {
                                                        fileName: "[project]/admin/components/product-manager.tsx",
                                                        lineNumber: 16,
                                                        columnNumber: 1420
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/admin/components/product-manager.tsx",
                                                    lineNumber: 16,
                                                    columnNumber: 1324
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/admin/components/product-manager.tsx",
                                            lineNumber: 16,
                                            columnNumber: 1197
                                        }, this)
                                    ]
                                }, p.id, true, {
                                    fileName: "[project]/admin/components/product-manager.tsx",
                                    lineNumber: 16,
                                    columnNumber: 668
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/admin/components/product-manager.tsx",
                            lineNumber: 16,
                            columnNumber: 645
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/admin/components/product-manager.tsx",
                    lineNumber: 16,
                    columnNumber: 347
                }, this)
            }, void 0, false, {
                fileName: "[project]/admin/components/product-manager.tsx",
                lineNumber: 16,
                columnNumber: 309
            }, this),
            editing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 grid place-items-center bg-black/45 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: save,
                    className: "max-h-[94vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-7",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6 flex justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[10px] font-bold tracking-[.2em] text-muted uppercase",
                                            children: "Complete product setup"
                                        }, void 0, false, {
                                            fileName: "[project]/admin/components/product-manager.tsx",
                                            lineNumber: 16,
                                            columnNumber: 1723
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "mt-1 text-2xl font-black",
                                            children: editing.id ? 'Edit product' : 'New product'
                                        }, void 0, false, {
                                            fileName: "[project]/admin/components/product-manager.tsx",
                                            lineNumber: 16,
                                            columnNumber: 1823
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/admin/components/product-manager.tsx",
                                    lineNumber: 16,
                                    columnNumber: 1718
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setEditing(null),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {}, void 0, false, {
                                        fileName: "[project]/admin/components/product-manager.tsx",
                                        lineNumber: 16,
                                        columnNumber: 1975
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/admin/components/product-manager.tsx",
                                    lineNumber: 16,
                                    columnNumber: 1920
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/admin/components/product-manager.tsx",
                            lineNumber: 16,
                            columnNumber: 1675
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-4 sm:grid-cols-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                    name: "name",
                                    label: "Product name",
                                    value: editing.name
                                }, void 0, false, {
                                    fileName: "[project]/admin/components/product-manager.tsx",
                                    lineNumber: 16,
                                    columnNumber: 2037
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                    name: "slug",
                                    label: "URL slug",
                                    value: editing.slug
                                }, void 0, false, {
                                    fileName: "[project]/admin/components/product-manager.tsx",
                                    lineNumber: 16,
                                    columnNumber: 2099
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                    name: "price",
                                    label: "Price (৳)",
                                    value: editing.price,
                                    type: "number"
                                }, void 0, false, {
                                    fileName: "[project]/admin/components/product-manager.tsx",
                                    lineNumber: 16,
                                    columnNumber: 2157
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                    name: "inventory",
                                    label: "Total inventory",
                                    value: editing.inventory,
                                    type: "number"
                                }, void 0, false, {
                                    fileName: "[project]/admin/components/product-manager.tsx",
                                    lineNumber: 16,
                                    columnNumber: 2232
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Label, {
                                            children: "Category"
                                        }, void 0, false, {
                                            fileName: "[project]/admin/components/product-manager.tsx",
                                            lineNumber: 16,
                                            columnNumber: 2328
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            name: "category",
                                            defaultValue: editing.category,
                                            className: "input",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "acid-wash",
                                                    children: "Acid Wash"
                                                }, void 0, false, {
                                                    fileName: "[project]/admin/components/product-manager.tsx",
                                                    lineNumber: 16,
                                                    columnNumber: 2425
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "oversized",
                                                    children: "Oversized"
                                                }, void 0, false, {
                                                    fileName: "[project]/admin/components/product-manager.tsx",
                                                    lineNumber: 16,
                                                    columnNumber: 2469
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: "essentials",
                                                    children: "Essentials"
                                                }, void 0, false, {
                                                    fileName: "[project]/admin/components/product-manager.tsx",
                                                    lineNumber: 16,
                                                    columnNumber: 2513
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/admin/components/product-manager.tsx",
                                            lineNumber: 16,
                                            columnNumber: 2351
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/admin/components/product-manager.tsx",
                                    lineNumber: 16,
                                    columnNumber: 2321
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                    name: "fabric",
                                    label: "Fabric / material",
                                    value: editing.fabric
                                }, void 0, false, {
                                    fileName: "[project]/admin/components/product-manager.tsx",
                                    lineNumber: 16,
                                    columnNumber: 2576
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "sm:col-span-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Label, {
                                            children: "Available sizes · comma separated"
                                        }, void 0, false, {
                                            fileName: "[project]/admin/components/product-manager.tsx",
                                            lineNumber: 16,
                                            columnNumber: 2680
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: editing.sizesText,
                                            onChange: (e)=>set('sizesText', e.target.value),
                                            className: "input",
                                            placeholder: "S, M, L, XL, 2XL"
                                        }, void 0, false, {
                                            fileName: "[project]/admin/components/product-manager.tsx",
                                            lineNumber: 16,
                                            columnNumber: 2728
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-2 flex flex-wrap gap-2",
                                            children: String(editing.sizesText).split(',').filter(Boolean).map((size)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "rounded-md bg-[#f1f1ed] px-3 py-1 text-xs font-bold",
                                                    children: size.trim()
                                                }, size, false, {
                                                    fileName: "[project]/admin/components/product-manager.tsx",
                                                    lineNumber: 16,
                                                    columnNumber: 2976
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/admin/components/product-manager.tsx",
                                            lineNumber: 16,
                                            columnNumber: 2860
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/admin/components/product-manager.tsx",
                                    lineNumber: 16,
                                    columnNumber: 2647
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "sm:col-span-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Label, {
                                            children: "Colors · one per line as Name|#hex"
                                        }, void 0, false, {
                                            fileName: "[project]/admin/components/product-manager.tsx",
                                            lineNumber: 16,
                                            columnNumber: 3126
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            value: editing.colorsText,
                                            onChange: (e)=>set('colorsText', e.target.value),
                                            rows: 3,
                                            className: "input h-auto py-3",
                                            placeholder: 'Jet Black|#0b0b0b\nCloud White|#f1efe9'
                                        }, void 0, false, {
                                            fileName: "[project]/admin/components/product-manager.tsx",
                                            lineNumber: 16,
                                            columnNumber: 3175
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-2 flex flex-wrap gap-3",
                                            children: String(editing.colorsText).split('\n').map((row)=>{
                                                const [name, hex] = row.split('|');
                                                return name && hex ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "flex items-center gap-2 text-xs font-bold",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                            className: "size-5 rounded-full border",
                                                            style: {
                                                                background: hex
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/admin/components/product-manager.tsx",
                                                            lineNumber: 16,
                                                            columnNumber: 3578
                                                        }, this),
                                                        name
                                                    ]
                                                }, row, true, {
                                                    fileName: "[project]/admin/components/product-manager.tsx",
                                                    lineNumber: 16,
                                                    columnNumber: 3508
                                                }, this) : null;
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/admin/components/product-manager.tsx",
                                            lineNumber: 16,
                                            columnNumber: 3357
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/admin/components/product-manager.tsx",
                                    lineNumber: 16,
                                    columnNumber: 3093
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "sm:col-span-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Label, {
                                            children: "Product photos"
                                        }, void 0, false, {
                                            fileName: "[project]/admin/components/product-manager.tsx",
                                            lineNumber: 16,
                                            columnNumber: 3712
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "flex cursor-pointer items-center justify-center gap-3 rounded-xl border-2 border-dashed border-line bg-[#fafaf8] p-6 text-sm font-bold hover:border-ink",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImagePlus$3e$__["ImagePlus"], {
                                                    size: 20
                                                }, void 0, false, {
                                                    fileName: "[project]/admin/components/product-manager.tsx",
                                                    lineNumber: 16,
                                                    columnNumber: 3912
                                                }, this),
                                                uploading ? 'Uploading…' : 'Choose photos · multiple allowed',
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "file",
                                                    accept: "image/jpeg,image/png,image/webp,image/gif",
                                                    multiple: true,
                                                    disabled: uploading,
                                                    onChange: (e)=>upload(e.target.files),
                                                    className: "hidden"
                                                }, void 0, false, {
                                                    fileName: "[project]/admin/components/product-manager.tsx",
                                                    lineNumber: 16,
                                                    columnNumber: 3997
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/admin/components/product-manager.tsx",
                                            lineNumber: 16,
                                            columnNumber: 3741
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-3 grid grid-cols-3 gap-3 sm:grid-cols-5",
                                            children: String(editing.imagesText).split('\n').filter(Boolean).map((url)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "group relative aspect-square overflow-hidden rounded-lg bg-[#eee]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: url,
                                                            alt: "",
                                                            className: "h-full w-full object-cover"
                                                        }, void 0, false, {
                                                            fileName: "[project]/admin/components/product-manager.tsx",
                                                            lineNumber: 16,
                                                            columnNumber: 4391
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>removeImage(url),
                                                            className: "absolute top-1 right-1 grid size-6 place-items-center rounded-full bg-black text-white",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                                size: 12
                                                            }, void 0, false, {
                                                                fileName: "[project]/admin/components/product-manager.tsx",
                                                                lineNumber: 16,
                                                                columnNumber: 4605
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/admin/components/product-manager.tsx",
                                                            lineNumber: 16,
                                                            columnNumber: 4453
                                                        }, this)
                                                    ]
                                                }, url, true, {
                                                    fileName: "[project]/admin/components/product-manager.tsx",
                                                    lineNumber: 16,
                                                    columnNumber: 4298
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/admin/components/product-manager.tsx",
                                            lineNumber: 16,
                                            columnNumber: 4164
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/admin/components/product-manager.tsx",
                                    lineNumber: 16,
                                    columnNumber: 3681
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "sm:col-span-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Label, {
                                            children: "Product badges / collections"
                                        }, void 0, false, {
                                            fileName: "[project]/admin/components/product-manager.tsx",
                                            lineNumber: 16,
                                            columnNumber: 4681
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: editing.tagsText,
                                            onChange: (e)=>set('tagsText', e.target.value),
                                            className: "input",
                                            placeholder: "new, trending, best, must"
                                        }, void 0, false, {
                                            fileName: "[project]/admin/components/product-manager.tsx",
                                            lineNumber: 16,
                                            columnNumber: 4724
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/admin/components/product-manager.tsx",
                                    lineNumber: 16,
                                    columnNumber: 4648
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "sm:col-span-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Label, {
                                            children: "Product detail bullets · one per line"
                                        }, void 0, false, {
                                            fileName: "[project]/admin/components/product-manager.tsx",
                                            lineNumber: 16,
                                            columnNumber: 4904
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            value: editing.detailsText,
                                            onChange: (e)=>set('detailsText', e.target.value),
                                            rows: 5,
                                            className: "input h-auto py-3"
                                        }, void 0, false, {
                                            fileName: "[project]/admin/components/product-manager.tsx",
                                            lineNumber: 16,
                                            columnNumber: 4956
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/admin/components/product-manager.tsx",
                                    lineNumber: 16,
                                    columnNumber: 4871
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            name: "published",
                                            type: "checkbox",
                                            defaultChecked: editing.published
                                        }, void 0, false, {
                                            fileName: "[project]/admin/components/product-manager.tsx",
                                            lineNumber: 16,
                                            columnNumber: 5136
                                        }, this),
                                        " Published on website"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/admin/components/product-manager.tsx",
                                    lineNumber: 16,
                                    columnNumber: 5093
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/admin/components/product-manager.tsx",
                            lineNumber: 16,
                            columnNumber: 1994
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-5 rounded-lg bg-red-50 p-3 text-xs font-bold text-red-700",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/admin/components/product-manager.tsx",
                            lineNumber: 16,
                            columnNumber: 5255
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            disabled: uploading,
                            className: "mt-6 w-full rounded-lg bg-ink py-4 text-xs font-bold text-white uppercase disabled:opacity-50",
                            children: "Save and publish product"
                        }, void 0, false, {
                            fileName: "[project]/admin/components/product-manager.tsx",
                            lineNumber: 16,
                            columnNumber: 5343
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/admin/components/product-manager.tsx",
                    lineNumber: 16,
                    columnNumber: 1570
                }, this)
            }, void 0, false, {
                fileName: "[project]/admin/components/product-manager.tsx",
                lineNumber: 16,
                columnNumber: 1494
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/admin/components/product-manager.tsx",
        lineNumber: 16,
        columnNumber: 10
    }, this);
}
_s(ProductManager, "/HCVpQo61nEr+3JNkzt/StIFzuk=");
_c = ProductManager;
function Label({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "mb-2 block text-[10px] font-bold tracking-[.15em] text-muted uppercase",
        children: children
    }, void 0, false, {
        fileName: "[project]/admin/components/product-manager.tsx",
        lineNumber: 18,
        columnNumber: 70
    }, this);
}
_c1 = Label;
function Field({ name, label, value, type = 'text' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Label, {
                children: label
            }, void 0, false, {
                fileName: "[project]/admin/components/product-manager.tsx",
                lineNumber: 19,
                columnNumber: 127
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                required: true,
                name: name,
                defaultValue: value,
                type: type,
                className: "input"
            }, void 0, false, {
                fileName: "[project]/admin/components/product-manager.tsx",
                lineNumber: 19,
                columnNumber: 149
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/admin/components/product-manager.tsx",
        lineNumber: 19,
        columnNumber: 120
    }, this);
}
_c2 = Field;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "ProductManager");
__turbopack_context__.k.register(_c1, "Label");
__turbopack_context__.k.register(_c2, "Field");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/admin/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "API",
    ()=>API,
    "getBanners",
    ()=>getBanners,
    "getOrders",
    ()=>getOrders,
    "getProducts",
    ()=>getProducts,
    "getSettings",
    ()=>getSettings,
    "getSummary",
    ()=>getSummary,
    "getUsers",
    ()=>getUsers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const API = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
async function getSummary() {
    try {
        const r = await fetch(`${API}/dashboard/summary`, {
            cache: 'no-store'
        });
        if (!r.ok) throw new Error();
        return r.json();
    } catch  {
        return {
            orders: 0,
            products: 0,
            revenue: 0,
            pending: 0
        };
    }
}
async function getOrders() {
    try {
        const r = await fetch(`${API}/orders`, {
            cache: 'no-store'
        });
        if (!r.ok) throw new Error();
        return r.json();
    } catch  {
        return [];
    }
}
async function getProducts() {
    try {
        const r = await fetch(`${API}/products`, {
            cache: 'no-store'
        });
        if (!r.ok) throw new Error();
        return r.json();
    } catch  {
        return [];
    }
}
async function getBanners() {
    try {
        const r = await fetch(`${API}/banners`, {
            cache: 'no-store'
        });
        return r.ok ? r.json() : [];
    } catch  {
        return [];
    }
}
async function getUsers() {
    try {
        const r = await fetch(`${API}/users`, {
            cache: 'no-store'
        });
        return r.ok ? r.json() : [];
    } catch  {
        return [];
    }
}
async function getSettings() {
    try {
        const r = await fetch(`${API}/settings`, {
            cache: 'no-store'
        });
        return r.ok ? r.json() : {};
    } catch  {
        return {};
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/lucide-react/dist/esm/icons/image-plus.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ImagePlus
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const ImagePlus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("ImagePlus", [
    [
        "path",
        {
            d: "M16 5h6",
            key: "1vod17"
        }
    ],
    [
        "path",
        {
            d: "M19 2v6",
            key: "4bpg5p"
        }
    ],
    [
        "path",
        {
            d: "M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5",
            key: "1ue2ih"
        }
    ],
    [
        "path",
        {
            d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",
            key: "1xmnt7"
        }
    ],
    [
        "circle",
        {
            cx: "9",
            cy: "9",
            r: "2",
            key: "af1f0g"
        }
    ]
]);
;
}),
"[project]/node_modules/lucide-react/dist/esm/icons/image-plus.js [app-client] (ecmascript) <export default as ImagePlus>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ImagePlus",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image-plus.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/pencil.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Pencil
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Pencil = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Pencil", [
    [
        "path",
        {
            d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
            key: "1a8usu"
        }
    ],
    [
        "path",
        {
            d: "m15 5 4 4",
            key: "1mk7zo"
        }
    ]
]);
;
}),
"[project]/node_modules/lucide-react/dist/esm/icons/pencil.js [app-client] (ecmascript) <export default as Pencil>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Pencil",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pencil.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Plus
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Plus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Plus", [
    [
        "path",
        {
            d: "M5 12h14",
            key: "1ays0h"
        }
    ],
    [
        "path",
        {
            d: "M12 5v14",
            key: "s699le"
        }
    ]
]);
;
}),
"[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Plus",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Trash2
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Trash2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Trash2", [
    [
        "path",
        {
            d: "M3 6h18",
            key: "d0wm0j"
        }
    ],
    [
        "path",
        {
            d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",
            key: "4alrt4"
        }
    ],
    [
        "path",
        {
            d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",
            key: "v07s0e"
        }
    ],
    [
        "line",
        {
            x1: "10",
            x2: "10",
            y1: "11",
            y2: "17",
            key: "1uufr5"
        }
    ],
    [
        "line",
        {
            x1: "14",
            x2: "14",
            y1: "11",
            y2: "17",
            key: "xtxkd"
        }
    ]
]);
;
}),
"[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Trash2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>X
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const X = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("X", [
    [
        "path",
        {
            d: "M18 6 6 18",
            key: "1bl5f8"
        }
    ],
    [
        "path",
        {
            d: "m6 6 12 12",
            key: "d8bk6v"
        }
    ]
]);
;
}),
"[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "X",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_16bbnex._.js.map