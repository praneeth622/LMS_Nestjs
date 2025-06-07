import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Organization } from './organizations.entity';
import { User } from '../users/users.entity';

@Entity('organization_users')
export class OrganizationUser {
  @PrimaryColumn()
  organization_id: number;

  @PrimaryColumn()
  user_id: number;

  @Column({ length: 50 })
  role: string;

  @ManyToOne(() => Organization, organization => organization.organizationUsers)
  @JoinColumn({ name: 'organization_id' })
  organization: Organization;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}