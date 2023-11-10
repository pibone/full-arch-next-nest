import { Body, Controller, Get, Post } from '@nestjs/common';
import { Alert, AlertsService } from '~/features/alerts/alerts.service';

@Controller('alerts')
export class AlertsController {
  constructor(private readonly alertsService: AlertsService) {}
  @Get()
  async getAlerts() {
    const alerts = await this.alertsService.getAlerts();
    return alerts;
  }
  @Post()
  async postAlerts(@Body() alert: Alert) {
    return this.alertsService.queueAlerts(alert);
  }
}
