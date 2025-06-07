import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { AuditService } from './audit.service';

@ApiTags('audit-logs')
@Controller('audit-logs')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get()
  @ApiOperation({ summary: 'Get all audit logs (Admin only)' })
  @ApiResponse({ status: 200, description: 'Audit logs retrieved successfully' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'table', required: false, type: String })
  @ApiQuery({ name: 'action', required: false, type: String })
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('table') table?: string,
    @Query('action') action?: string,
  ) {
    const pageNum = page ? +page : 1;
    const limitNum = limit ? +limit : 50;

    if (table) {
      return this.auditService.findByTable(table, pageNum, limitNum);
    }

    if (action) {
      return this.auditService.findByAction(action, pageNum, limitNum);
    }

    return this.auditService.findAll(pageNum, limitNum);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get audit logs by user ID' })
  @ApiResponse({ status: 200, description: 'User audit logs retrieved successfully' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findByUser(
    @Param('userId') userId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNum = page ? +page : 1;
    const limitNum = limit ? +limit : 50;
    return this.auditService.findByUser(+userId, pageNum, limitNum);
  }

  @Get('table/:tableName')
  @ApiOperation({ summary: 'Get audit logs by table name' })
  @ApiResponse({ status: 200, description: 'Table audit logs retrieved successfully' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findByTable(
    @Param('tableName') tableName: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNum = page ? +page : 1;
    const limitNum = limit ? +limit : 50;
    return this.auditService.findByTable(tableName, pageNum, limitNum);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get audit statistics' })
  @ApiResponse({ status: 200, description: 'Audit statistics retrieved successfully' })
  async getStats() {
    // You can implement statistics here
    return {
      message: 'Audit statistics endpoint - implement as needed',
      available_endpoints: [
        'GET /audit-logs - All logs with pagination',
        'GET /audit-logs/user/:userId - User specific logs',
        'GET /audit-logs/table/:tableName - Table specific logs',
        'GET /audit-logs?action=POST - Filter by action type',
      ],
    };
  }
}
