import { PrismaService } from './prisma.service';
import { StoreService } from './store.service';
import { AuthService } from './auth.service';
export declare class OrdersController {
    private store;
    private prisma;
    private auth;
    constructor(store: StoreService, prisma: PrismaService, auth: AuthService);
    list(): import(".prisma/client").Prisma.PrismaPromise<({
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
    create(body: any, authorization?: string): Promise<{
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
    }>;
    updateStatus(id: string, status: any): import(".prisma/client").Prisma.Prisma__OrderClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
