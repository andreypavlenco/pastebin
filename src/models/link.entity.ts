import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { PostEntity } from './post.entity';
import { SettingEntity } from './setting.entity';

@Entity('link')
export class LinkEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  link_id: number;

  @Column({ type: 'varchar' })
  link: string;

  @OneToOne(() => SettingEntity, (setting) => setting.link)
  setting: SettingEntity;

  @OneToOne(() => PostEntity, (post) => post.link)
  post: PostEntity;

  @CreateDateColumn()
  createAt: Date;
}
