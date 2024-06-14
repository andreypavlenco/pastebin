import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SettingEntity } from './setting.entity';
import { LinkEntity } from './link.entity';

@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  post_id: number;

  @Column({ type: 'varchar' })
  key_text: string;

  // @OneToMany(() => User, (user) => user.post)
  // @JoinColumn({ name: 'user_id' })
  // user: User;

  @CreateDateColumn()
  createAt: Date;

  @OneToOne(() => SettingEntity, (setting) => setting.post)
  setting: SettingEntity;

  @OneToOne(() => LinkEntity, (link) => link.post)
  @JoinColumn({ name: 'link_id' })
  link: LinkEntity;

  // @Column({ type: 'int' })
  // user_id: number;
}
