import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { ChangeUserDto } from './dto/change-user.dto';
import { mapUserBigInt } from 'src/common/helpers/user';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAll() {
    return await this.userRepository.getAll();
  }

  async getUser(id: string) {
    const user = await this.userRepository.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return mapUserBigInt(user);
  }

  async createUser(createUserDto: CreateUserDto) {
    return await this.userRepository.createUser({ ...createUserDto, refreshToken: '' });
  }

  async updateUser(id: string, updateUserDto: ChangeUserDto) {
    const user = await this.userRepository.getUserById(id, true);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (updateUserDto.oldPassword !== user.password) {
      throw new ForbiddenException('Wrong password');
    }
    const userUpdated = await this.userRepository.updateUser(id, {
      ...updateUserDto,
      refreshToken: user.refreshToken,
    });
    return userUpdated;
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    this.userRepository.deleteUser(id);
  }
}
