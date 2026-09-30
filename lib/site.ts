// Brand + contact settings. Update the TODO values with the client's real details.
export const site = {
  name: "Eleganto",
  tagline: "Different is Beautiful",
  description:
    "Eleganto — oversized acid wash and graphic streetwear. Different is Beautiful.",
  location: "Dhaka, Bangladesh · Nationwide Delivery",
  facebook: "https://www.facebook.com/elegantooooo",
  messenger: "https://m.me/elegantooooo",
  // TODO: client's WhatsApp number in international format, digits only (e.g. 8801712345678).
  // Leave empty to send orders through Facebook Messenger instead.
  whatsapp: "",
  // TODO: client's public email + phone. Rows are hidden in the footer while empty.
  email: "",
  phone: "",
  currency: "৳",
  freeShippingOver: 3000,
  zones: [
    { id: "inside", label: "Inside Dhaka", fee: 80, eta: "24–48 hrs" },
    { id: "outside", label: "Outside Dhaka", fee: 150, eta: "3–5 days" },
  ],
} as const;

export const marquee = [
  "ELEGANTO™",
  "DIFFERENT IS BEAUTIFUL",
  "NEW DROP · LIVE NOW",
  "ACID WASH SERIES",
  "LIMITED EDITION",
  `FREE SHIPPING ON ORDERS OVER ৳3K`,
];

export function money(n: number) {
  return `${site.currency}${n.toLocaleString("en-US")}`;
}
