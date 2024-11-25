import { Injectable } from '@nestjs/common';
import { CreateUserDtoWithToken } from './dto/create-user.dto';
import { ChangeUserDtoWithToken } from './dto/change-user.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { v4 } from 'uuid';
import { mapUserBigInt } from 'src/common/helpers/user';

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) {}

  async getAll() {
    return (
      await this.prismaService.user.findMany({
        select: {
          id: true,
          login: true,
          password: false,
          createdAt: true,
          updatedAt: true,
          version: true,
          refreshToken: false,
        },
      })
    ).map(mapUserBigInt);
  }

  async getUserById(id: string, isPassword = false) {
    return await this.prismaService.user.findUnique({
      where: { id },
      select: {
        id: true,
        login: true,
        password: isPassword,
        createdAt: true,
        updatedAt: true,
        version: true,
        refreshToken: true,
      },
    });
  }

  async getUserByLogin(login: string, isPassword = false) {
    return await this.prismaService.user.findFirst({
      where: { login },
      select: {
        id: true,
        login: true,
        password: isPassword,
        createdAt: true,
        updatedAt: true,
        version: true,
        refreshToken: false,
      },
    });
  }

  async createUser(createUserDto: CreateUserDtoWithToken) {
    return mapUserBigInt(
      await this.prismaService.user.create({
        data: {
          id: v4(),
          login: createUserDto.login,
          password: createUserDto.password,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          version: 1,
          refreshToken: createUserDto.refreshToken,
        },
        select: {
          id: true,
          login: true,
          password: false,
          createdAt: true,
          updatedAt: true,
          version: true,
          refreshToken: false,
        },
      }),
    );
  }

  async updateUser(id: string, changeUserDto: ChangeUserDtoWithToken) {
    return mapUserBigInt(
      await this.prismaService.user.update({
        where: { id },
        data: {
          password: changeUserDto.newPassword,
          updatedAt: Date.now(),
          version: {
            increment: 1,
          },
          refreshToken: changeUserDto.refreshToken,
        },
        select: {
          id: true,
          login: true,
          password: false,
          createdAt: true,
          updatedAt: true,
          version: true,
          refreshToken: false,
        },
      }),
    );
  }

  async deleteUser(id: string) {
    await this.prismaService.user.delete({ where: { id } });
  }
}
