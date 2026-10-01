import { PrismaService } from './prisma.service';
export declare class SettingsController {
    private prisma;
    constructor(prisma: PrismaService);
    list(): Promise<{
        [k: string]: string;
    }>;
    save(body: Record<string, string>): Promise<{
        [k: string]: string;
    }>;
}
