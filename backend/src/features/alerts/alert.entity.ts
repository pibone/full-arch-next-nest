import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import type { Alert } from './alerts.service';

@Entity()
export class AlertEntity implements Alert {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  userId: number;

  @Column({ default: false })
  isRead: boolean;

  @Column({ default: true })
  @Index()
  isActive: boolean;

  @Column()
  message: string;

  @Column()
  priority: number;
}
