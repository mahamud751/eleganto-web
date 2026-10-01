# Eleganto — commerce platform

Three-app workspace for [Eleganto](https://www.facebook.com/elegantooooo): a Next.js storefront, NestJS/Prisma API, and a Next.js admin console.

```bash
npm install
cp backend/.env.example backend/.env
docker compose up -d postgres
npm run db:generate
npm run db:migrate
npm run db:seed
npm run dev     # web :3000 · api :4000 · admin :3001
```

API docs are available at `http://localhost:4000/docs`.

## Apps

- `web/` — existing customer storefront and checkout.
- `backend/` — NestJS REST API, Prisma schema, PostgreSQL connection, Swagger docs, catalog/order/dashboard endpoints.
- `admin/` — management dashboard for revenue/order summary, orders, products, and store settings.

The admin app reads `NEXT_PUBLIC_API_URL` and defaults to `http://localhost:4000/api`.

## Where to edit

- `lib/site.ts` — brand name, WhatsApp number, email, phone, delivery zones/fees, marquee text.
- `lib/products.ts` — products, prices, categories, lookbook images.
- `public/images/` — product photos (resized copies of `images/`).

## Orders

Checkout records the order through the API and then sends the same order to the shop:
- If `site.whatsapp` is set → opens WhatsApp with the order pre-filled.
- Otherwise → copies the order and opens Facebook Messenger (m.me/elegantooooo).

The newsletter form is visual only — connect it to a mailing service before relying on it.
