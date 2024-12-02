/*
 * @Description:TypeORM是通过实体映射到数据表，所以要建立一个项目实体posts.entity.ts
 * @Author: yangsen
 * @Date: 2022-04-03 22:27:54
 * @LastEditors: yangsen
 * @LastEditTime: 2024-12-02 10:02:50
 */

import { Expose } from 'class-transformer';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('project') // 没有指定表名，则表名默认为类名project_entity
export class ProjectEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string; // 标记为主键，值自动生成
  @Expose({ name: 'projectName' })
  @Column({ length: 50 })
  project_name: string;
  @Expose({ name: 'projectDesc' })
  @Column('text')
  project_desc: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_date?: Date;
  /* 使用@UpdateDateColumn装饰器会自动更新时间戳 */
  @UpdateDateColumn({ type: 'timestamp' })
  update_date?: Date;
}
