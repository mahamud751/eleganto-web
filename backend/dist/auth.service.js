"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const node_crypto_1 = require("node:crypto");
const prisma_service_1 = require("./prisma.service");
let AuthService = class AuthService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    hash(password, salt = (0, node_crypto_1.randomBytes)(16).toString('hex')) { return `${salt}:${(0, node_crypto_1.scryptSync)(password, salt, 64).toString('hex')}`; }
    verify(password, stored) { const [salt, key] = stored.split(':'); const actual = (0, node_crypto_1.scryptSync)(password, salt, 64); return key?.length === actual.toString('hex').length && (0, node_crypto_1.timingSafeEqual)(Buffer.from(key, 'hex'), actual); }
    async session(userId) { const token = (0, node_crypto_1.randomBytes)(32).toString('hex'); await this.prisma.session.create({ data: { token, userId, expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) } }); return token; }
    async userFromHeader(header) { const token = header?.replace(/^Bearer\s+/i, ''); if (!token)
        return null; const session = await this.prisma.session.findUnique({ where: { token }, include: { user: true } }); if (!session || session.expiresAt < new Date() || !session.user.active)
        return null; return session.user; }
    async requireUser(header) { const user = await this.userFromHeader(header); if (!user)
        throw new common_1.UnauthorizedException('Please sign in'); return user; }
    publicUser(user) { const { passwordHash, ...safe } = user; return safe; }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map