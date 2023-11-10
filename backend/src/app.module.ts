import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
// import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeaturesModule } from './features/features.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'redis',
        port: +(process.env.REDIS_PORT || '6379'),
        password: process.env.REDIS_PASSWORD || undefined,
        keyPrefix: 'bull-queue',
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'postgres',
      port: +(process.env.POSTGRES_PORT || '5432'),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      synchronize: true,
      autoLoadEntities: true,
    }),
    FeaturesModule,
  ],
})
export class AppModule {}
