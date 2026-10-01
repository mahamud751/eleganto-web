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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const prisma_service_1 = require("./prisma.service");
const auth_service_1 = require("./auth.service");
let AuthController = class AuthController {
    constructor(prisma, auth) {
        this.prisma = prisma;
        this.auth = auth;
    }
    async register(body) { const email = String(body.email || '').trim().toLowerCase(); if (await this.prisma.user.findUnique({ where: { email } }))
        throw new common_1.ConflictException('Email already registered'); const user = await this.prisma.user.create({ data: { name: body.name, email, phone: body.phone, passwordHash: this.auth.hash(body.password) } }); return { token: await this.auth.session(user.id), user: this.auth.publicUser(user) }; }
    async login(body) { const user = await this.prisma.user.findUnique({ where: { email: String(body.email || '').trim().toLowerCase() } }); if (!user || !this.auth.verify(body.password || '', user.passwordHash) || !user.active)
        throw new common_1.UnauthorizedException('Invalid email or password'); return { token: await this.auth.session(user.id), user: this.auth.publicUser(user) }; }
    async me(header) { return this.auth.publicUser(await this.auth.requireUser(header)); }
    async logout(header) { const token = header?.replace(/^Bearer\s+/i, ''); if (token)
        await this.prisma.session.deleteMany({ where: { token } }); return { success: true }; }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "me", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map