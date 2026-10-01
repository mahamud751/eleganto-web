import { PrismaService } from './prisma.service';
export declare class BannersController {
    private prisma;
    constructor(prisma: PrismaService);
    list(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        link: string | null;
        active: boolean;
        title: string;
        subtitle: string | null;
        image: string;
        position: number;
    }[]>;
    create(body: any): import(".prisma/client").Prisma.Prisma__BannerClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        link: string | null;
        active: boolean;
        title: string;
        subtitle: string | null;
        image: string;
        position: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, body: any): import(".prisma/client").Prisma.Prisma__BannerClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        link: string | null;
        active: boolean;
        title: string;
        subtitle: string | null;
        image: string;
        position: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__BannerClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        link: string | null;
        active: boolean;
        title: string;
        subtitle: string | null;
        image: string;
        position: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
