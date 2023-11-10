import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlertEntity } from './alert.entity';
import { NEW_ALERT } from './alerts.contants';
import { AlertsController } from './alerts.controller';
import { AlertsService } from './alerts.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlertEntity]),
    BullModule.registerQueue({
      name: NEW_ALERT,
    }),
  ],
  providers: [AlertsService],
  exports: [AlertsService],
  controllers: [AlertsController],
})
export class AlertsModule {}
