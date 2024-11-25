import { IsString } from 'class-validator';

export class ChangeUserDto {
  @IsString()
  oldPassword: string;

  @IsString()
  newPassword: string;
}

export class ChangeUserDtoWithToken extends ChangeUserDto {
  @IsString()
  refreshToken: string;
}
