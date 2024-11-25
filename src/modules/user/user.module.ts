import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UserController],
  providers: [JwtService, UserService, UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
