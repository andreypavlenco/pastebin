import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { PostEntity } from './post.entity';
import { LinkEntity } from './link.entity';

@Entity('setting')
export class SettingEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  setting_id: number;

  @Column({ type: 'timestamp' })
  deleteLink: Date;

  @Column({ type: 'timestamp' })
  deletePost: Date;

  // @ManyToOne(() => User, (user) => user.setting)
  // @JoinColumn({ name: 'user_id' })
  // user: User;

  @OneToOne(() => LinkEntity, (link) => link.setting)
  @JoinColumn({ name: 'link_id' })
  link: LinkEntity;

  @OneToOne(() => PostEntity, (post) => post.setting)
  @JoinColumn({ name: 'post_id' })
  post: PostEntity;

  @BeforeInsert()
  updateDates() {
    const currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() + 5);
    this.deleteLink = currentDate;
    this.deletePost = currentDate;
  }
}
