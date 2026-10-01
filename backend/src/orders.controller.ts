import { BadRequestException, Body, Controller, Get, Headers, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from './prisma.service';
import { StoreService } from './store.service';
import { AuthService } from './auth.service';
import { AdminGuard } from './admin.guard';

// Setting key + default for each method; a missing key keeps only COD on
const PAYMENT_SETTINGS: Record<string, [string, boolean]> = { COD: ['codEnabled', true], BKASH: ['bkashEnabled', false], NAGAD: ['nagadEnabled', false] };

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private store: StoreService, private prisma: PrismaService, private auth: AuthService) {}
  @UseGuards(AdminGuard) @Get() list() { return this.store.orders(); }
  @Post() async create(@Body() body: any, @Headers('authorization') authorization?: string) {
    const paymentMethod = body.paymentMethod || 'COD';
    const [settingKey, fallback] = PAYMENT_SETTINGS[paymentMethod] ?? [];
    if (!settingKey) throw new BadRequestException('Unknown payment method');
    const setting = await this.prisma.siteSetting.findUnique({ where: { key: settingKey } });
    if (!(setting?.value ? setting.value === 'true' : fallback)) throw new BadRequestException('This payment method is currently unavailable');
    const products = await this.prisma.product.findMany({ where: { slug: { in: (body.items ?? []).map((item: any) => item.slug) } } });
    const items = (body.items ?? []).map((item: any) => { const p = products.find((product: { slug: string }) => product.slug === item.slug); if (!p) throw new Error(`Product not found: ${item.slug}`); return { productId: p.id, name: `${p.name}${item.color ? ` · ${item.color}` : ''}`, size: item.size, quantity: item.quantity, unitPrice: p.price }; });
    const subtotal = items.reduce((sum: number, item: any) => sum + item.unitPrice * item.quantity, 0);
    const deliveryFee = Number(body.deliveryFee ?? 0);
    const user = await this.auth.userFromHeader(authorization);
    return this.prisma.order.create({ data: { orderNumber: `ELG-${Date.now().toString().slice(-8)}`, customerName: body.customerName, phone: body.phone, altPhone: body.altPhone, address: body.address, city: body.city, zone: body.zone, notes: body.notes, subtotal, deliveryFee, total: subtotal + deliveryFee, paymentMethod, paymentNumber: body.paymentNumber, transactionId: body.transactionId, userId: user?.id, items: { create: items } }, include: { items: true } });
  }
  @UseGuards(AdminGuard) @Patch(':id/status') updateStatus(@Param('id') id: string, @Body('status') status: any) { return this.prisma.order.update({ where: { id }, data: { status } }); }
}
