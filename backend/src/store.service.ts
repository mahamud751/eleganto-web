import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class StoreService {
  constructor(private prisma: PrismaService) {}
  products() { return this.prisma.product.findMany({ orderBy: { createdAt: 'desc' } }); }
  product(id: string) { return this.prisma.product.findUnique({ where: { id } }); }
  orders() { return this.prisma.order.findMany({ include: { items: true }, orderBy: { createdAt: 'desc' } }); }
  async dashboard() {
    const [orders, products, revenue, pending] = await Promise.all([
      this.prisma.order.count(), this.prisma.product.count(), this.prisma.order.aggregate({ _sum: { total: true }, where: { status: { not: 'CANCELLED' } } }), this.prisma.order.count({ where: { status: 'PENDING' } }),
    ]);
    return { orders, products, revenue: revenue._sum.total ?? 0, pending };
  }
}
