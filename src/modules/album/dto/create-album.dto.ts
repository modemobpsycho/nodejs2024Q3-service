import { IsNumber, IsString, ValidateIf } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  name: string;

  @ValidateIf((object, value) => value !== null)
  @IsString()
  artistId: string | null;

  @IsNumber()
  year: number;
}
