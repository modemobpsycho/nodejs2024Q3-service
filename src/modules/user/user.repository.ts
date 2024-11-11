import { Injectable } from '@nestjs/common';
import { DB } from 'src/common/db';
import { v4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangeUserDto } from './dto/change-user.dto';
import { User } from 'src/common/interfaces/user.interface';

@Injectable()
export class UserRepository {
  getAll() {
    return DB.users;
  }

  getUser(id: string) {
    return DB.users.find((user) => user.id === id);
  }

  createUser(createUserDto: CreateUserDto) {
    const id = v4();
    DB.users.push({
      id,
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return { ...DB.users.find((user) => user.id === id) };
  }

  updateUser(id: string, changeUserDto: ChangeUserDto) {
    let userUpdating: User | undefined;
    DB.users = DB.users.map((user) => {
      if (user.id === id) {
        userUpdating = {
          id: user.id,
          login: user.login,
          password: changeUserDto.newPassword,
          createdAt: user.createdAt,
          updatedAt: Date.now(),
          version: user.version + 1,
        };
        return userUpdating;
      }
      return user;
    });
    return { ...userUpdating };
  }

  deleteUser(id: string) {
    DB.users = DB.users.filter((user) => user.id !== id);
  }
}
