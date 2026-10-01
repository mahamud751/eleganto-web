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
        email: string;
        phone: string | null;
        role: import(".prisma/client").$Enums.UserRole;
        active: boolean;
    }[]>;
    orders(header?: string): Promise<({
        items: {
            id: string;
            name: string;
            orderId: string;
            productId: string;
            size: string;
            quantity: number;
            unitPrice: number;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        phone: string;
        orderNumber: string;
        customerName: string;
        altPhone: string | null;
        address: string;
        city: string;
        zone: string;
        notes: string | null;
        subtotal: number;
        deliveryFee: number;
        total: number;
        status: import(".prisma/client").$Enums.OrderStatus;
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
