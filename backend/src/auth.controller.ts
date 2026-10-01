import { Body, ConflictException, Controller, Get, Headers, Post, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from './prisma.service';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private prisma: PrismaService, private auth: AuthService) {}
  @Post('register') async register(@Body() body: any) { const email = String(body.email || '').trim().toLowerCase(); if (await this.prisma.user.findUnique({ where: { email } })) throw new ConflictException('Email already registered'); const user = await this.prisma.user.create({ data: { name: body.name, email, phone: body.phone, passwordHash: this.auth.hash(body.password) } }); return { token: await this.auth.session(user.id), user: this.auth.publicUser(user) }; }
  @Post('login') async login(@Body() body: any) { const user = await this.prisma.user.findUnique({ where: { email: String(body.email || '').trim().toLowerCase() } }); if (!user || !this.auth.verify(body.password || '', user.passwordHash) || !user.active) throw new UnauthorizedException('Invalid email or password'); return { token: await this.auth.session(user.id), user: this.auth.publicUser(user) }; }
  @Get('me') async me(@Headers('authorization') header?: string) { return this.auth.publicUser(await this.auth.requireUser(header)); }
  @Post('logout') async logout(@Headers('authorization') header?: string) { const token = header?.replace(/^Bearer\s+/i, ''); if (token) await this.prisma.session.deleteMany({ where: { token } }); return { success: true }; }
}
