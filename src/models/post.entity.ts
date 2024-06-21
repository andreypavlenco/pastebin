import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SettingEntity } from './setting.entity';
import { LinkEntity } from './link.entity';
import { UserEntity } from './user.entity';

@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  post_id: number;

  @Column({ type: 'varchar' })
  key_file: string;

  @Column({ type: 'int', default: 0 })
  popular: number;

  @ManyToOne(() => UserEntity, (user) => user.post)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @CreateDateColumn()
  createAt: Date;

  @OneToOne(() => SettingEntity, (setting) => setting.post)
  @JoinColumn({ name: 'setting_id' })
  setting: SettingEntity;

  @OneToOne(() => LinkEntity, (link) => link.post)
  @JoinColumn({ name: 'link_id' })
  link: LinkEntity;
}
