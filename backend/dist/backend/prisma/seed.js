"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const products_1 = require("../../web/lib/products");
const node_crypto_1 = require("node:crypto");
const prisma = new client_1.PrismaClient();
const hash = (password) => { const salt = 'eleganto-admin-seed'; return `${salt}:${(0, node_crypto_1.scryptSync)(password, salt, 64).toString('hex')}`; };
async function main() {
    for (const p of products_1.products)
        await prisma.product.upsert({ where: { slug: p.slug }, update: { name: p.name, price: p.price, category: p.category, colorName: p.color.name, colorHex: p.color.hex, images: p.images, tags: p.tags, fabric: p.fabric, details: p.details, inventory: 24 }, create: { slug: p.slug, name: p.name, price: p.price, category: p.category, colorName: p.color.name, colorHex: p.color.hex, images: p.images, tags: p.tags, fabric: p.fabric, details: p.details, inventory: 24 } });
    await prisma.user.upsert({ where: { email: 'admin@eleganto.com' }, update: { role: 'ADMIN' }, create: { name: 'Eleganto Admin', email: 'admin@eleganto.com', passwordHash: hash('Admin123!'), role: 'ADMIN' } });
    if (await prisma.banner.count() === 0)
        await prisma.banner.create({ data: { title: 'Different is Beautiful', subtitle: 'The new oversized collection is live.', image: '/images/look-stairs-duo.jpg', link: '/shop', position: 0 } });
    for (const [key, value] of Object.entries({ storeName: 'Eleganto', tagline: 'Different is Beautiful', currency: '৳', freeShippingOver: '3000' }))
        await prisma.siteSetting.upsert({ where: { key }, update: { value }, create: { key, value } });
}
main().finally(() => prisma.$disconnect());
//# sourceMappingURL=seed.js.map