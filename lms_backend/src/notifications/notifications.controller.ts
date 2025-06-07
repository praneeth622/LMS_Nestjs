import { Controller, Get, Put, Param, Query, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @ApiOperation({ summary: 'List all notifications (admin) or user notifications' })
  @ApiResponse({ status: 200, description: 'Notifications retrieved successfully' })
  async findAll(@Query('user_id') userId?: string) {
    if (userId) {
      return this.notificationsService.findAllForUser(+userId);
    }
    return this.notificationsService.findAll();
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get notifications for specific user' })
  @ApiResponse({ status: 200, description: 'User notifications retrieved successfully' })
  async findAllForUser(@Param('userId') userId: string) {
    return this.notificationsService.findAllForUser(+userId);
  }

  @Get('user/:userId/unread-count')
  @ApiOperation({ summary: 'Get unread notifications count for user' })
  @ApiResponse({ status: 200, description: 'Unread count retrieved successfully' })
  async getUnreadCount(@Param('userId') userId: string) {
    return this.notificationsService.getUnreadCount(+userId);
  }

  @Put(':id/read')
  @ApiOperation({ summary: 'Mark notification as read' })
  @ApiResponse({ status: 200, description: 'Notification marked as read successfully' })
  async markAsRead(@Param('id') id: string) {
    return this.notificationsService.markAsRead(+id);
  }

  @Put('user/:userId/read-all')
  @ApiOperation({ summary: 'Mark all notifications as read for user' })
  @ApiResponse({ status: 200, description: 'All notifications marked as read successfully' })
  async markAllAsRead(@Param('userId') userId: string) {
    return this.notificationsService.markAllAsReadForUser(+userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create notification (for testing)' })
  @ApiResponse({ status: 201, description: 'Notification created successfully' })
  async create(@Body() createNotificationDto: { user_id: number; message: string }) {
    return this.notificationsService.create(createNotificationDto.user_id, createNotificationDto.message);
  }
}
