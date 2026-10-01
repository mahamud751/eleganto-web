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
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const prisma_service_1 = require("./prisma.service");
const store_service_1 = require("./store.service");
const auth_service_1 = require("./auth.service");
let OrdersController = class OrdersController {
    constructor(store, prisma, auth) {
        this.store = store;
        this.prisma = prisma;
        this.auth = auth;
    }
    list() { return this.store.orders(); }
    async create(body, authorization) {
        const products = await this.prisma.product.findMany({ where: { slug: { in: (body.items ?? []).map((item) => item.slug) } } });
        const items = (body.items ?? []).map((item) => { const p = products.find((product) => product.slug === item.slug); if (!p)
            throw new Error(`Product not found: ${item.slug}`); return { productId: p.id, name: `${p.name}${item.color ? ` · ${item.color}` : ''}`, size: item.size, quantity: item.quantity, unitPrice: p.price }; });
        const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
        const deliveryFee = Number(body.deliveryFee ?? 0);
        const user = await this.auth.userFromHeader(authorization);
        return this.prisma.order.create({ data: { orderNumber: `ELG-${Date.now().toString().slice(-8)}`, customerName: body.customerName, phone: body.phone, altPhone: body.altPhone, address: body.address, city: body.city, zone: body.zone, notes: body.notes, subtotal, deliveryFee, total: subtotal + deliveryFee, paymentMethod: body.paymentMethod || 'COD', paymentNumber: body.paymentNumber, transactionId: body.transactionId, userId: user?.id, items: { create: items } }, include: { items: true } });
    }
    updateStatus(id, status) { return this.prisma.order.update({ where: { id }, data: { status } }); }
};
exports.OrdersController = OrdersController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "updateStatus", null);
exports.OrdersController = OrdersController = __decorate([
    (0, swagger_1.ApiTags)('orders'),
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [store_service_1.StoreService, prisma_service_1.PrismaService, auth_service_1.AuthService])
], OrdersController);
//# sourceMappingURL=orders.controller.js.map