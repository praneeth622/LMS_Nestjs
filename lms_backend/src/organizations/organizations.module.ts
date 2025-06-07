import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';
import { Organization } from './organizations.entity';
import { OrganizationUser } from './organization-users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Organization, OrganizationUser])],
  controllers: [OrganizationsController],
  providers: [OrganizationsService],
  exports: [OrganizationsService, TypeOrmModule]
})
export class OrganizationsModule {}
