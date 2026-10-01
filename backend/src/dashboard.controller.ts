import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StoreService } from './store.service';
import { AdminGuard } from './admin.guard';

@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private store: StoreService) {}
  @UseGuards(AdminGuard) @Get('summary') summary() { return this.store.dashboard(); }
}
