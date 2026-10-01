import { PrismaService } from './prisma.service';
import { AuthService } from './auth.service';
export declare class UsersController {
    private prisma;
    private auth;
    constructor(prisma: PrismaService, auth: AuthService);
    list(): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        _count: {
            orders: number;
        };
        phone: string | null;
        email: string;
        role: import(".prisma/client").$Enums.UserRole;
        active: boolean;
    }[]>;
    orders(header?: string): Promise<({
        items: {
            id: string;
            name: string;
            size: string;
            quantity: number;
            unitPrice: number;
            productId: string;
            orderId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        orderNumber: string;
        customerName: string;
        phone: string;
        altPhone: string | null;
        address: string;
        city: string;
        zone: string;
        notes: string | null;
        subtotal: number;
        deliveryFee: number;
        total: number;
        paymentMethod: string;
        paymentNumber: string | null;
        transactionId: string | null;
        status: import(".prisma/client").$Enums.OrderStatus;
        userId: string | null;
    })[]>;
    wishlist(header?: string): Promise<({
        product: {
            id: string;
            slug: string;
            name: string;
            price: number;
            category: string;
            colorName: string;
            colorHex: string;
            colors: import("@prisma/client/runtime/library").JsonValue;
            sizes: string[];
            images: string[];
            tags: string[];
            fabric: string;
            details: string[];
            inventory: number;
            published: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        productId: string;
    })[]>;
    addWishlist(header: string | undefined, productRef: string): Promise<{
        product: {
            id: string;
            slug: string;
            name: string;
            price: number;
            category: string;
            colorName: string;
            colorHex: string;
            colors: import("@prisma/client/runtime/library").JsonValue;
            sizes: string[];
            images: string[];
            tags: string[];
            fabric: string;
            details: string[];
            inventory: number;
            published: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        productId: string;
    }>;
    removeWishlist(header: string | undefined, productRef: string): Promise<{
        success: boolean;
    }>;
}
