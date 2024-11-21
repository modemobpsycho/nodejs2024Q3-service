import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangeUserDto } from './dto/change-user.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAll() {
    return this.userRepository.getAll();
  }

  async getUser(id: string) {
    const user = this.userRepository.getUser(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.userRepository.getUser(id);
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = this.userRepository.createUser(createUserDto);
    delete user.password;
    return user;
  }

  async updateUser(id: string, updateUserDto: ChangeUserDto) {
    const user = this.userRepository.getUser(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (updateUserDto.oldPassword !== user.password) {
      throw new ForbiddenException('Wrong password');
    }
    const userUpdated = this.userRepository.updateUser(id, updateUserDto);
    delete userUpdated.password;
    return userUpdated;
  }

  async deleteUser(id: string) {
    const user = this.userRepository.getUser(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    this.userRepository.deleteUser(id);
  }
}
