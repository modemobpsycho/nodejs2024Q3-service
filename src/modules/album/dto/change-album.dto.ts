import { IsNumber, IsString, ValidateIf } from 'class-validator';

export class ChangeAlbumDto {
  @IsString()
  name: string;

  @IsNumber()
  year: number;

  @ValidateIf((object, value) => value !== null)
  @IsString()
  artistId: string | null;
}
