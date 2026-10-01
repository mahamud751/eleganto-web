import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from './prisma.service';
import { AdminGuard } from './admin.guard';
@ApiTags('banners') @Controller('banners')
export class BannersController { constructor(private prisma: PrismaService) {} @Get() list() { return this.prisma.banner.findMany({ orderBy: { position: 'asc' } }); } @UseGuards(AdminGuard) @Post() create(@Body() body: any) { return this.prisma.banner.create({ data: body }); } @UseGuards(AdminGuard) @Patch(':id') update(@Param('id') id: string, @Body() body: any) { return this.prisma.banner.update({ where: { id }, data: body }); } @UseGuards(AdminGuard) @Delete(':id') remove(@Param('id') id: string) { return this.prisma.banner.delete({ where: { id } }); } }
