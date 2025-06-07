import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { Role } from './roles.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async create(createUserDto: any) {
    // Check if email already exists
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email, is_deleted: false },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);

    const user = this.userRepository.create({
      ...createUserDto,
      password_hash: hashedPassword,
    });

    return await this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find({
      where: { is_deleted: false },
      relations: ['role'],
      select: ['id', 'name', 'email', 'created_at'],
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id, is_deleted: false },
      relations: ['role'],
      select: ['id', 'name', 'email', 'created_at'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: number, updateUserDto: any) {
    const user = await this.findOne(id);

    if (updateUserDto.password) {
      const saltRounds = 10;
      updateUserDto.password_hash = await bcrypt.hash(updateUserDto.password, saltRounds);
      delete updateUserDto.password;
    }

    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    user.is_deleted = true;
    return await this.userRepository.save(user);
  }

  async createRole(name: string) {
    const role = this.roleRepository.create({ name });
    return await this.roleRepository.save(role);
  }

  async getAllRoles() {
    return await this.roleRepository.find();
  }

  async assignRole(userId: number, roleId: number) {
    const user = await this.findOne(userId);
    const role = await this.roleRepository.findOne({ where: { id: roleId } });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    user.role_id = roleId;
    return await this.userRepository.save(user);
  }
}
