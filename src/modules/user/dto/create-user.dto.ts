import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  login: string;

  @IsString()
  password: string;
}

export class CreateUserDtoWithToken extends CreateUserDto {
  @IsString()
  refreshToken: string;
}
