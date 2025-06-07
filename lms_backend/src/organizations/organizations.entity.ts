import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OrganizationUser } from './organization-users.entity';

@Entity('organizations')
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 50, nullable: true })
  type: string;

  @OneToMany(() => OrganizationUser, orgUser => orgUser.organization)
  organizationUsers: OrganizationUser[];
}