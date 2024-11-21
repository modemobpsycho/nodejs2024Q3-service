import { IsNumber, IsString, ValidateIf } from 'class-validator';

export class TrackDto {
  @IsString()
  name: string;

  @ValidateIf((object, value) => value !== null)
  @IsString()
  artistId: string;

  @ValidateIf((object, value) => value !== null)
  @IsString()
  albumId: string | null;

  @IsNumber()
  duration: number;
}
