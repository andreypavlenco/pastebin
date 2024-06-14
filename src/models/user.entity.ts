// import {
//   Column,
//   Entity,
//   JoinColumn,
//   OneToMany,
//   PrimaryGeneratedColumn,
// } from 'typeorm';
// import { Post } from './post.entity';
// import { Setting } from './setting.entity';

// @Entity('user')
// export class UserEntity {
//   @PrimaryGeneratedColumn({ type: 'int' })
//   user_id: number;

//   @Column({ type: 'varchar' })
//   email: string;

//   @Column({ type: 'varchar' })
//   password: string;

//   @OneToMany(() => Post, (post) => post.user)
//   @JoinColumn()
//   post: Post[];

//   @OneToMany(() => Setting, (setting) => setting.user)
//   @JoinColumn()
//   setting: Setting[];
// }
