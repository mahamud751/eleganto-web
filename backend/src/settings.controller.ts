import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from './prisma.service';
import { AdminGuard } from './admin.guard';
@ApiTags('settings') @Controller('settings')
export class SettingsController { constructor(private prisma: PrismaService) {} @Get() async list() { const rows = await this.prisma.siteSetting.findMany(); return Object.fromEntries(rows.map(row => [row.key, row.value])); } @UseGuards(AdminGuard) @Put() async save(@Body() body: Record<string, string>) { await Promise.all(Object.entries(body).map(([key, value]) => this.prisma.siteSetting.upsert({ where: { key }, update: { value: String(value) }, create: { key, value: String(value) } }))); return this.list(); } }
