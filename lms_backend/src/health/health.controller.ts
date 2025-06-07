import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  @Get()
  @ApiOperation({ summary: 'Health check endpoint' })
  async check() {
    const dbStatus = this.dataSource.isInitialized ? 'connected' : 'disconnected';
    
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: dbStatus,
      environment: process.env.NODE_ENV || 'development',
    };
  }

  @Get('db')
  @ApiOperation({ summary: 'Database connection check' })
  async checkDatabase() {
    try {
      await this.dataSource.query('SELECT 1');
      return { database: 'connected', timestamp: new Date().toISOString() };
    } catch (error) {
      return { database: 'disconnected', error: error.message };
    }
  }
}