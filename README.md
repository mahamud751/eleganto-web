# Eleganto — storefront

Next.js 16.3.6 storefront for [Eleganto](https://www.facebook.com/elegantooooo), laid out after feliciteclo.com.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Where to edit

- `lib/site.ts` — brand name, WhatsApp number, email, phone, delivery zones/fees, marquee text.
- `lib/products.ts` — products, prices, categories, lookbook images.
- `public/images/` — product photos (resized copies of `images/`).

## Orders

No payment gateway or database. Checkout builds the order (items, sizes, total, customer details)
and sends it to the shop:
- If `site.whatsapp` is set → opens WhatsApp with the order pre-filled.
- Otherwise → copies the order and opens Facebook Messenger (m.me/elegantooooo).

The newsletter form is visual only — connect it to a mailing service before relying on it.
