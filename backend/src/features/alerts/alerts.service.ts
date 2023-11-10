import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job, Queue } from 'bull';
import { Repository } from 'typeorm';
import { AlertEntity } from './alert.entity';
import { NEW_ALERT } from './alerts.contants';

@Injectable()
@Processor(NEW_ALERT)
export class AlertsService {
  private readonly logger = new Logger(AlertsService.name);

  constructor(
    @InjectQueue(NEW_ALERT)
    private readonly newAlertQueue: Queue<AlertQueueData>,
    @InjectRepository(AlertEntity)
    private readonly alertRepository: Repository<AlertEntity>,
  ) {}

  async queueAlerts(alerts: AlertQueueData) {
    return await this.newAlertQueue.add(alerts);
  }

  async getAlerts(): Promise<Alert[]> {
    return this.alertRepository.find();
  }

  @Process()
  protected async processAlert(job: Job<AlertQueueData>) {
    try {
      const alerts = Array.isArray(job.data) ? job.data : [job.data];
      const alertsEntity = this.alertRepository.create(alerts);
      await this.alertRepository.save(alertsEntity);
    } catch (e) {
      if (e instanceof Error) {
        this.logger.error(e.message, e.stack);
      } else {
        this.logger.error(e);
      }
    }
  }
}

export type AlertQueueData = Alert | Alert[];

export interface Alert {
  id?: string;
  userId: number;
  isRead: boolean;
  message: string;
  priority: number;
}
