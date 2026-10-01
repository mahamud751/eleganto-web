import { Injectable, UnauthorizedException } from '@nestjs/common';
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { PrismaService } from './prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  hash(password: string, salt = randomBytes(16).toString('hex')) { return `${salt}:${scryptSync(password, salt, 64).toString('hex')}`; }
  verify(password: string, stored: string) { const [salt, key] = stored.split(':'); const actual = scryptSync(password, salt, 64); return key?.length === actual.toString('hex').length && timingSafeEqual(Buffer.from(key, 'hex'), actual); }
  async session(userId: string) { const token = randomBytes(32).toString('hex'); await this.prisma.session.create({ data: { token, userId, expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) } }); return token; }
  async userFromHeader(header?: string) { const token = header?.replace(/^Bearer\s+/i, ''); if (!token) return null; const session = await this.prisma.session.findUnique({ where: { token }, include: { user: true } }); if (!session || session.expiresAt < new Date() || !session.user.active) return null; return session.user; }
  async requireUser(header?: string) { const user = await this.userFromHeader(header); if (!user) throw new UnauthorizedException('Please sign in'); return user; }
  publicUser(user: any) { const { passwordHash, ...safe } = user; return safe; }
}
