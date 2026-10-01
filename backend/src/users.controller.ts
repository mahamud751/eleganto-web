import { Controller, Delete, Get, Headers, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from './prisma.service';
import { AuthService } from './auth.service';
import { AdminGuard } from './admin.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private prisma: PrismaService, private auth: AuthService) {}
  @UseGuards(AdminGuard) @Get() async list() { return this.prisma.user.findMany({ select: { id: true, name: true, email: true, phone: true, role: true, active: true, createdAt: true, _count: { select: { orders: true } } }, orderBy: { createdAt: 'desc' } }); }
  @Get('me/orders') async orders(@Headers('authorization') header?: string) { const user = await this.auth.requireUser(header); return this.prisma.order.findMany({ where: { userId: user.id }, include: { items: true }, orderBy: { createdAt: 'desc' } }); }
  @Get('me/wishlist') async wishlist(@Headers('authorization') header?: string) { const user = await this.auth.requireUser(header); return this.prisma.wishlistItem.findMany({ where: { userId: user.id }, include: { product: true }, orderBy: { createdAt: 'desc' } }); }
  @Post('me/wishlist/:productRef') async addWishlist(@Headers('authorization') header: string | undefined, @Param('productRef') productRef: string) { const user = await this.auth.requireUser(header); const product = await this.prisma.product.findFirstOrThrow({ where: { OR: [{ id: productRef }, { slug: productRef }] } }); return this.prisma.wishlistItem.upsert({ where: { userId_productId: { userId: user.id, productId: product.id } }, update: {}, create: { userId: user.id, productId: product.id }, include: { product: true } }); }
  @Delete('me/wishlist/:productRef') async removeWishlist(@Headers('authorization') header: string | undefined, @Param('productRef') productRef: string) { const user = await this.auth.requireUser(header); const product = await this.prisma.product.findFirst({ where: { OR: [{ id: productRef }, { slug: productRef }] } }); if (product) await this.prisma.wishlistItem.deleteMany({ where: { userId: user.id, productId: product.id } }); return { success: true }; }
}
