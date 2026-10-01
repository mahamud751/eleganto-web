import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StoreService } from './store.service';
import { PrismaService } from './prisma.service';

@ApiTags('catalog')
@Controller('products')
export class ProductsController {
  constructor(private store: StoreService, private prisma: PrismaService) {}
  @Get() list() { return this.store.products(); }
  @Get(':id') one(@Param('id') id: string) { return this.store.product(id); }
  @Post() create(@Body() body: any) { return this.prisma.product.create({ data: body }); }
  @Patch(':id') update(@Param('id') id: string, @Body() body: any) { return this.prisma.product.update({ where: { id }, data: body }); }
  @Delete(':id') remove(@Param('id') id: string) { return this.prisma.product.delete({ where: { id } }); }
}
