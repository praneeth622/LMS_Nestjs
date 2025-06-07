import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from './organizations.entity';
import { OrganizationUser } from './organization-users.entity';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
    @InjectRepository(OrganizationUser)
    private organizationUserRepository: Repository<OrganizationUser>,
  ) {}

  async create(createOrgDto: any) {
    const organization = this.organizationRepository.create(createOrgDto);
    return await this.organizationRepository.save(organization);
  }

  async findAll() {
    return await this.organizationRepository.find({
      relations: ['organizationUsers', 'organizationUsers.user'],
    });
  }

  async findOne(id: number) {
    const organization = await this.organizationRepository.findOne({
      where: { id },
      relations: ['organizationUsers', 'organizationUsers.user'],
    });

    if (!organization) {
      throw new NotFoundException('Organization not found');
    }

    return organization;
  }

  async addUserToOrganization(organizationId: number, userId: number, role: string) {
    // Check if user is already in organization
    const existingOrgUser = await this.organizationUserRepository.findOne({
      where: { organization_id: organizationId, user_id: userId },
    });

    if (existingOrgUser) {
      throw new ConflictException('User is already in this organization');
    }

    const organizationUser = this.organizationUserRepository.create({
      organization_id: organizationId,
      user_id: userId,
      role,
    });

    return await this.organizationUserRepository.save(organizationUser);
  }

  async getOrganizationUsers(organizationId: number) {
    return await this.organizationUserRepository.find({
      where: { organization_id: organizationId },
      relations: ['user'],
    });
  }

  async removeUserFromOrganization(organizationId: number, userId: number) {
    const organizationUser = await this.organizationUserRepository.findOne({
      where: { organization_id: organizationId, user_id: userId },
    });

    if (!organizationUser) {
      throw new NotFoundException('User not found in organization');
    }

    return await this.organizationUserRepository.remove(organizationUser);
  }
}
