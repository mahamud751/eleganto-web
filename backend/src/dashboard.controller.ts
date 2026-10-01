import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StoreService } from './store.service';

@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private store: StoreService) {}
  @Get('summary') summary() { return this.store.dashboard(); }
}
