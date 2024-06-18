import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { PostEntity } from './post.entity';
import { LinkEntity } from './link.entity';
import { UserEntity } from './user.entity';

@Entity('setting')
export class SettingEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  setting_id: number;

  @Column({ type: 'timestamp' })
  deleteTimePost: Date;

  @ManyToOne(() => UserEntity, (user) => user.setting)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToOne(() => LinkEntity, (link) => link.setting)
  @JoinColumn({ name: 'link_id' })
  link: LinkEntity;

  @OneToOne(() => PostEntity, (post) => post.setting)
  @JoinColumn({ name: 'post_id' })
  post: PostEntity;

  @BeforeInsert()
  updateDates() {
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 6);
    this.deleteTimePost = currentDate;
  }
}
