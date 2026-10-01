import { PrismaService } from './prisma.service';
export declare class StoreService {
    private prisma;
    constructor(prisma: PrismaService);
    products(): import(".prisma/client").Prisma.PrismaPromise<{
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
    }[]>;
    product(id: string): import(".prisma/client").Prisma.Prisma__ProductClient<{
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
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    orders(): import(".prisma/client").Prisma.PrismaPromise<({
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
    dashboard(): Promise<{
        orders: number;
        products: number;
        revenue: number;
        pending: number;
    }>;
}
