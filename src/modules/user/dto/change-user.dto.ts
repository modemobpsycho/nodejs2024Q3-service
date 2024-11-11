import { IsString } from 'class-validator';

export class ChangeUserDto {
  @IsString()
  oldPassword: string;

  @IsString()
  newPassword: string;
}
