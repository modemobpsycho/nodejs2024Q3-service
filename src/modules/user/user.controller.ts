import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangeUserDto } from './dto/change-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAll() {
    return await this.userService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.userService.getUser(id);
  }

  @HttpCode(201)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() changeUserDto: ChangeUserDto,
  ) {
    return await this.userService.updateUser(id, changeUserDto);
  }

  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.userService.deleteUser(id);
  }
}
