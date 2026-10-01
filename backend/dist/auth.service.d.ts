import { PrismaService } from './prisma.service';
export declare class AuthService {
    private prisma;
    constructor(prisma: PrismaService);
    hash(password: string, salt?: string): string;
    verify(password: string, stored: string): boolean;
    session(userId: string): Promise<string>;
    userFromHeader(header?: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        email: string;
        passwordHash: string;
        role: import(".prisma/client").$Enums.UserRole;
        active: boolean;
    } | null>;
    requireUser(header?: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        email: string;
        passwordHash: string;
        role: import(".prisma/client").$Enums.UserRole;
        active: boolean;
    }>;
    publicUser(user: any): any;
}
