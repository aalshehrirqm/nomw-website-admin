import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AllowedTo } from '../auth/decorators/roles.decorator';
import { UserRole } from 'src/database/schemas/user.schema';

@Controller({ path: 'dashboard', version: '1' })
@UseGuards(JwtAuthGuard, RolesGuard)
@AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER, UserRole.EDITOR)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) { }

  @Get('stats')
  async getStats() {
    return this.dashboardService.getStats();
  }

  @Get('system-status')
  async getSystemStatus() {
    return this.dashboardService.getSystemStatus();
  }

  @Get('recent-activities')
  async getRecentActivities(@Query('limit') limit?: string) {
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.dashboardService.getRecentActivities(limitNum);
  }
}
