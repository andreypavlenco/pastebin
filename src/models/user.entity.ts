import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostEntity } from './post.entity';
import { SettingEntity } from './setting.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  user_id: number;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @OneToMany(() => PostEntity, (post) => post.user)
  @JoinColumn()
  post: PostEntity[];

  @OneToMany(() => SettingEntity, (setting) => setting.user)
  @JoinColumn()
  setting: SettingEntity[];

  @Column({ type: 'varchar' })
  refreshToken: string;
}
