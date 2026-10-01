module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/admin/app/products/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Products
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$admin$2f$components$2f$page$2d$header$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/admin/components/page-header.tsx [app-rsc] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@/components/product-manager'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$admin$2f$lib$2f$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/admin/lib/api.ts [app-rsc] (ecmascript)");
;
;
;
;
async function Products() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$admin$2f$components$2f$page$2d$header$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                eyebrow: "Catalogue",
                title: "Products"
            }, void 0, false, {
                fileName: "[project]/admin/app/products/page.tsx",
                lineNumber: 4,
                columnNumber: 53
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(ProductManager, {
                initial: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$admin$2f$lib$2f$api$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getProducts"])()
            }, void 0, false, {
                fileName: "[project]/admin/app/products/page.tsx",
                lineNumber: 4,
                columnNumber: 104
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/admin/app/products/page.tsx",
        lineNumber: 4,
        columnNumber: 51
    }, this);
}
}),
"[project]/admin/app/products/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/admin/app/products/page.tsx [app-rsc] (ecmascript)"));
}),
"[project]/admin/components/page-header.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PageHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
;
function PageHeader({ eyebrow, title, action }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "mb-8 flex items-end justify-between gap-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mb-2 text-[11px] font-bold tracking-[.2em] text-muted uppercase",
                        children: eyebrow
                    }, void 0, false, {
                        fileName: "[project]/admin/components/page-header.tsx",
                        lineNumber: 1,
                        columnNumber: 202
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-4xl font-black tracking-[-.06em]",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/admin/components/page-header.tsx",
                        lineNumber: 1,
                        columnNumber: 294
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/admin/components/page-header.tsx",
                lineNumber: 1,
                columnNumber: 197
            }, this),
            action
        ]
    }, void 0, true, {
        fileName: "[project]/admin/components/page-header.tsx",
        lineNumber: 1,
        columnNumber: 135
    }, this);
}
}),
"[project]/admin/lib/api.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
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
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0-p3hpv._.js.map