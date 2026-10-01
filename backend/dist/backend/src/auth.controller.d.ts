import { PrismaService } from './prisma.service';
import { AuthService } from './auth.service';
export declare class AuthController {
    private prisma;
    private auth;
    constructor(prisma: PrismaService, auth: AuthService);
    register(body: any): Promise<{
        token: string;
        user: any;
    }>;
    login(body: any): Promise<{
        token: string;
        user: any;
    }>;
    me(header?: string): Promise<any>;
    logout(header?: string): Promise<{
        success: boolean;
    }>;
}
