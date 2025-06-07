import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OrganizationsService } from './organizations.service';

@ApiTags('organizations')
@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create organization' })
  @ApiResponse({ status: 201, description: 'Organization created successfully' })
  async create(@Body() createOrgDto: any) {
    return this.organizationsService.create(createOrgDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all organizations' })
  @ApiResponse({ status: 200, description: 'Organizations retrieved successfully' })
  async findAll() {
    return this.organizationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get organization by ID' })
  @ApiResponse({ status: 200, description: 'Organization retrieved successfully' })
  async findOne(@Param('id') id: string) {
    return this.organizationsService.findOne(+id);
  }

  @Post(':id/users')
  @ApiOperation({ summary: 'Add user to organization' })
  @ApiResponse({ status: 201, description: 'User added to organization successfully' })
  async addUserToOrganization(
    @Param('id') id: string,
    @Body() addUserDto: { user_id: number; role: string }
  ) {
    return this.organizationsService.addUserToOrganization(+id, addUserDto.user_id, addUserDto.role);
  }

  @Get(':id/users')
  @ApiOperation({ summary: 'Get organization users' })
  @ApiResponse({ status: 200, description: 'Organization users retrieved successfully' })
  async getOrganizationUsers(@Param('id') id: string) {
    return this.organizationsService.getOrganizationUsers(+id);
  }

  @Delete(':id/users/:userId')
  @ApiOperation({ summary: 'Remove user from organization' })
  @ApiResponse({ status: 200, description: 'User removed from organization successfully' })
  async removeUserFromOrganization(@Param('id') id: string, @Param('userId') userId: string) {
    return this.organizationsService.removeUserFromOrganization(+id, +userId);
  }
}
