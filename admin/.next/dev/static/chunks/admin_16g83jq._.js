(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/admin/components/settings-form.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SettingsForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$admin$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/admin/lib/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function SettingsForm({ initial }) {
    _s();
    const [saved, setSaved] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const submit = async (e)=>{
        e.preventDefault();
        const body = Object.fromEntries(new FormData(e.currentTarget));
        const r = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$admin$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API"]}/settings`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        setSaved(r.ok);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: submit,
        className: "card max-w-3xl p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-lg font-black",
                children: "Store configuration"
            }, void 0, false, {
                fileName: "[project]/admin/components/settings-form.tsx",
                lineNumber: 2,
                columnNumber: 460
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 text-sm text-muted",
                children: "Manage global storefront values and manual-payment numbers from one place."
            }, void 0, false, {
                fileName: "[project]/admin/components/settings-form.tsx",
                lineNumber: 2,
                columnNumber: 519
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 grid gap-4 sm:grid-cols-2",
                children: [
                    [
                        'storeName',
                        'Store name'
                    ],
                    [
                        'tagline',
                        'Tagline'
                    ],
                    [
                        'currency',
                        'Currency'
                    ],
                    [
                        'freeShippingOver',
                        'Free shipping over'
                    ],
                    [
                        'supportEmail',
                        'Support email'
                    ],
                    [
                        'supportPhone',
                        'Support phone'
                    ],
                    [
                        'facebook',
                        'Facebook URL'
                    ],
                    [
                        'whatsapp',
                        'WhatsApp number'
                    ],
                    [
                        'bkash',
                        'bKash payment number'
                    ],
                    [
                        'nagad',
                        'Nagad payment number'
                    ]
                ].map(([name, label])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mb-2 block text-[10px] font-bold uppercase text-muted",
                                children: label
                            }, void 0, false, {
                                fileName: "[project]/admin/components/settings-form.tsx",
                                lineNumber: 2,
                                columnNumber: 1031
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                name: name,
                                defaultValue: initial[name] || '',
                                className: "input"
                            }, void 0, false, {
                                fileName: "[project]/admin/components/settings-form.tsx",
                                lineNumber: 2,
                                columnNumber: 1117
                            }, this)
                        ]
                    }, name, true, {
                        fileName: "[project]/admin/components/settings-form.tsx",
                        lineNumber: 2,
                        columnNumber: 1013
                    }, this))
            }, void 0, false, {
                fileName: "[project]/admin/components/settings-form.tsx",
                lineNumber: 2,
                columnNumber: 636
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "mt-6 rounded-lg bg-ink px-7 py-3 text-xs font-bold text-white",
                children: "Save settings"
            }, void 0, false, {
                fileName: "[project]/admin/components/settings-form.tsx",
                lineNumber: 2,
                columnNumber: 1204
            }, this),
            saved && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ml-4 text-xs font-bold text-green-700",
                children: "Saved successfully"
            }, void 0, false, {
                fileName: "[project]/admin/components/settings-form.tsx",
                lineNumber: 2,
                columnNumber: 1316
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/admin/components/settings-form.tsx",
        lineNumber: 2,
        columnNumber: 405
    }, this);
}
_s(SettingsForm, "0vgVBJjGgeZRji8JKkAyIHLrONk=");
_c = SettingsForm;
var _c;
__turbopack_context__.k.register(_c, "SettingsForm");
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
]);

//# sourceMappingURL=admin_16g83jq._.js.map