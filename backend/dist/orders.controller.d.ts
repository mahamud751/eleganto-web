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
    create(body: any, authorization?: string): Promise<{
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
    }>;
    updateStatus(id: string, status: any): import(".prisma/client").Prisma.Prisma__OrderClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
