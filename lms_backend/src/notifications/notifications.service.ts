import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notifications.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async create(userId: number, message: string) {
    const notification = this.notificationRepository.create({
      user_id: userId,
      message,
    });
    return await this.notificationRepository.save(notification);
  }

  async findAllForUser(userId: number) {
    return await this.notificationRepository.find({
      where: { user_id: userId },
      order: { created_at: 'DESC' },
    });
  }

  async findAll() {
    return await this.notificationRepository.find({
      relations: ['user'],
      order: { created_at: 'DESC' },
    });
  }

  async markAsRead(id: number) {
    const notification = await this.notificationRepository.findOne({
      where: { id },
    });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    notification.read_flag = true;
    return await this.notificationRepository.save(notification);
  }

  async markAllAsReadForUser(userId: number) {
    await this.notificationRepository.update(
      { user_id: userId, read_flag: false },
      { read_flag: true }
    );
    return { message: 'All notifications marked as read' };
  }

  async getUnreadCount(userId: number) {
    const count = await this.notificationRepository.count({
      where: { user_id: userId, read_flag: false },
    });
    return { unread_count: count };
  }
}
