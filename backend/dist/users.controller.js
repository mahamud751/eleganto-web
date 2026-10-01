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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const prisma_service_1 = require("./prisma.service");
const auth_service_1 = require("./auth.service");
let UsersController = class UsersController {
    constructor(prisma, auth) {
        this.prisma = prisma;
        this.auth = auth;
    }
    async list() { return this.prisma.user.findMany({ select: { id: true, name: true, email: true, phone: true, role: true, active: true, createdAt: true, _count: { select: { orders: true } } }, orderBy: { createdAt: 'desc' } }); }
    async orders(header) { const user = await this.auth.requireUser(header); return this.prisma.order.findMany({ where: { userId: user.id }, include: { items: true }, orderBy: { createdAt: 'desc' } }); }
    async wishlist(header) { const user = await this.auth.requireUser(header); return this.prisma.wishlistItem.findMany({ where: { userId: user.id }, include: { product: true }, orderBy: { createdAt: 'desc' } }); }
    async addWishlist(header, productRef) { const user = await this.auth.requireUser(header); const product = await this.prisma.product.findFirstOrThrow({ where: { OR: [{ id: productRef }, { slug: productRef }] } }); return this.prisma.wishlistItem.upsert({ where: { userId_productId: { userId: user.id, productId: product.id } }, update: {}, create: { userId: user.id, productId: product.id }, include: { product: true } }); }
    async removeWishlist(header, productRef) { const user = await this.auth.requireUser(header); const product = await this.prisma.product.findFirst({ where: { OR: [{ id: productRef }, { slug: productRef }] } }); if (product)
        await this.prisma.wishlistItem.deleteMany({ where: { userId: user.id, productId: product.id } }); return { success: true }; }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('me/orders'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "orders", null);
__decorate([
    (0, common_1.Get)('me/wishlist'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "wishlist", null);
__decorate([
    (0, common_1.Post)('me/wishlist/:productRef'),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('productRef')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addWishlist", null);
__decorate([
    (0, common_1.Delete)('me/wishlist/:productRef'),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('productRef')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "removeWishlist", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, auth_service_1.AuthService])
], UsersController);
//# sourceMappingURL=users.controller.js.map