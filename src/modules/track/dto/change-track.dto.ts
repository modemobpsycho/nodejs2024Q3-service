import { IsNumber, IsString } from 'class-validator';

export class ChangeTrackDto {
  @IsString()
  name: string;

  @IsNumber()
  duration: number;
}
