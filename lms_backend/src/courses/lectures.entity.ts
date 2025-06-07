import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Section } from './sections.entity';
import { Resource } from './resources.entity';

@Entity('lectures')
export class Lecture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  section_id: number;

  @Column({ length: 200, nullable: true })
  title: string;

  @Column('text', { nullable: true })
  video_url: string;

  @Column({ nullable: true })
  duration: number;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @ManyToOne(() => Section, section => section.lectures)
  @JoinColumn({ name: 'section_id' })
  section: Section;

  @OneToMany(() => Resource, resource => resource.lecture)
  resources: Resource[];
}