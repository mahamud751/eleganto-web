import { PrismaClient } from '@prisma/client';
import { categories, products } from '../../web/lib/products';
import { randomBytes, scryptSync } from 'node:crypto';
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { basename, join } from 'node:path';

try { process.loadEnvFile(join(__dirname, '..', '.env')); } catch { /* env may come from the shell instead */ }

const prisma = new PrismaClient();
const PUBLIC_URL = (process.env.PUBLIC_URL || `http://localhost:${process.env.PORT || 4000}`).replace(/\/$/, '');
const WEB_PUBLIC = join(__dirname, '..', '..', 'web', 'public');
const SEED_UPLOADS = join(__dirname, '..', 'uploads', 'seed');
const hash = (password: string) => { const salt = randomBytes(16).toString('hex'); return `${salt}:${scryptSync(password, salt, 64).toString('hex')}`; };

/** Copies a storefront image (/images/x.jpg) into backend uploads so it is served like any admin upload. */
const copied = new Set<string>();
function image(src: string) {
  if (/^https?:\/\//.test(src)) return src;
  const from = join(WEB_PUBLIC, src);
  if (!existsSync(from)) throw new Error(`Seed image not found: ${from}`);
  const name = basename(src);
  copyFileSync(from, join(SEED_UPLOADS, name));
  copied.add(name);
  return `${PUBLIC_URL}/uploads/seed/${name}`;
}

const SIZES = ['S', 'M', 'L', 'XL', '2XL'];
const BANNERS = [
  { title: 'Different is Beautiful', subtitle: 'The new oversized collection is live.', image: '/images/look-stairs-duo.jpg', link: '/shop', position: 0 },
  { title: 'Acid Wash Series', subtitle: 'Hand-finished stone wash — every piece is one of one.', image: '/images/acid-tunnel-walk.jpg', link: '/shop?c=acid-wash', position: 1 },
  { title: 'Built to Layer', subtitle: 'Clean everyday essentials in heavyweight cotton.', image: '/images/process-stripes.jpg', link: '/shop?c=essentials', position: 2 },
];
const SETTINGS: Record<string, string> = { storeName: 'Eleganto', tagline: 'Different is Beautiful', currency: '৳', freeShippingOver: '3000', supportEmail: '', supportPhone: '', facebook: 'https://www.facebook.com/elegantooooo', whatsapp: '', bkash: '01789999751', nagad: '01789999751', codEnabled: 'true', bkashEnabled: 'false', nagadEnabled: 'false' };

async function main() {
  mkdirSync(SEED_UPLOADS, { recursive: true });

  // Products — reset to the catalogue in web/lib/products.ts
  for (const p of products) {
    const data = { name: p.name, price: p.price, category: p.category, colorName: p.color.name, colorHex: p.color.hex, colors: [p.color], sizes: SIZES, images: p.images.map(image), tags: p.tags, fabric: p.fabric, details: p.details, inventory: 24, published: true };
    await prisma.product.upsert({ where: { slug: p.slug }, update: data, create: { slug: p.slug, ...data } });
  }
  categories.forEach(c => image(c.cover)); // so category covers are also available from the API host

  // Banners — matched by title so re-running updates instead of duplicating
  for (const b of BANNERS) {
    const data = { ...b, image: image(b.image), active: true };
    const existing = await prisma.banner.findFirst({ where: { title: b.title } });
    if (existing) await prisma.banner.update({ where: { id: existing.id }, data }); else await prisma.banner.create({ data });
  }

  // Settings — only fill missing keys, never overwrite values saved from the admin
  for (const [key, value] of Object.entries(SETTINGS)) {
    await prisma.siteSetting.upsert({ where: { key }, update: {}, create: { key, value } });
    if (value) await prisma.siteSetting.updateMany({ where: { key, value: '' }, data: { value } });
  }

  // Accounts
  await prisma.user.upsert({ where: { email: 'admin@eleganto.com' }, update: { role: 'ADMIN' }, create: { name: 'Eleganto Admin', email: 'admin@eleganto.com', passwordHash: hash('Admin123!'), role: 'ADMIN' } });
  const customer = await prisma.user.upsert({ where: { email: 'customer@eleganto.com' }, update: {}, create: { name: 'Demo Customer', email: 'customer@eleganto.com', phone: '01700000000', passwordHash: hash('Customer123!') } });

  // Demo orders — only on an empty orders table, so real orders are never touched
  if (await prisma.order.count() === 0) {
    const bySlug = Object.fromEntries((await prisma.product.findMany()).map(p => [p.slug, p]));
    const demo = [
      { status: 'PENDING', paymentMethod: 'COD', zone: 'Inside Dhaka', fee: 80, items: [['the-queen-acid-wash', 'L', 1], ['red-box-graphic', 'XL', 1]] },
      { status: 'CONFIRMED', paymentMethod: 'BKASH', zone: 'Outside Dhaka', fee: 150, items: [['need-money-for-porsche', 'M', 2]], trx: 'BK7X2Q9LMN' },
      { status: 'SHIPPED', paymentMethod: 'NAGAD', zone: 'Inside Dhaka', fee: 80, items: [['eleganto-stone-wash', 'XL', 1]], trx: 'NG4P8R1KTZ' },
      { status: 'DELIVERED', paymentMethod: 'COD', zone: 'Inside Dhaka', fee: 80, items: [['eleganto-essential-black', 'M', 1], ['cloud-white-graphic', 'L', 1]] },
    ] as const;
    for (const [i, o] of demo.entries()) {
      const items = o.items.filter(([slug]) => bySlug[slug]).map(([slug, size, quantity]) => { const p = bySlug[slug]; return { productId: p.id, name: `${p.name} · ${p.colorName}`, size, quantity, unitPrice: p.price }; });
      if (!items.length) continue;
      const subtotal = items.reduce((s, x) => s + x.unitPrice * x.quantity, 0);
      await prisma.order.create({ data: { orderNumber: `ELG-DEMO-${i + 1}`, customerName: customer.name, phone: customer.phone || '01700000000', address: 'House 12, Road 5, Dhanmondi', city: o.zone === 'Inside Dhaka' ? 'Dhaka' : 'Chattogram', zone: o.zone, subtotal, deliveryFee: o.fee, total: subtotal + o.fee, paymentMethod: o.paymentMethod, paymentNumber: 'trx' in o ? '01700000000' : null, transactionId: 'trx' in o ? o.trx : null, status: o.status, userId: customer.id, createdAt: new Date(Date.now() - (demo.length - i) * 86_400_000), items: { create: items } } });
    }
  }

  console.log(`Seeded ${products.length} products, ${BANNERS.length} banners, ${Object.keys(SETTINGS).length} settings, 2 users, ${await prisma.order.count()} orders.`);
  console.log(`Copied ${copied.size} images to uploads/seed → ${PUBLIC_URL}/uploads/seed/`);
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
