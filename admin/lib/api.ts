export const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
// Browser components call the API through app/backend, which attaches the admin session token.
export const CLIENT_API = '/backend';
export type Banner = { id: string; title: string; subtitle?: string | null; image: string; link?: string | null; position: number; active: boolean };
export type Customer = { id: string; name: string; email: string; phone?: string | null; role: string; active: boolean; createdAt: string; _count: { orders: number } };
export type Summary = { orders: number; products: number; revenue: number; pending: number };
export type Order = { id: string; orderNumber: string; customerName: string; phone: string; altPhone?: string; address: string; city: string; zone: string; notes?: string; subtotal: number; deliveryFee: number; total: number; status: string; paymentMethod: string; paymentNumber?: string; transactionId?: string; createdAt: string; items: { id: string; name: string; size: string; quantity: number; unitPrice: number }[] };
export type Product = { id: string; name: string; slug: string; price: number; category: string; inventory: number; published: boolean; images: string[]; colorName: string; colorHex: string; colors: { name: string; hex: string }[]; sizes: string[]; tags: string[]; fabric: string; details: string[] };
