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
  UseGuards,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistDto } from './dto/artist.dto';
import { AuthGuard } from 'src/common/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  getAll() {
    return this.artistService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.artistService.getArtist(id);
  }

  @HttpCode(201)
  @Post()
  create(@Body() createArtistDto: ArtistDto) {
    return this.artistService.createArtist(createArtistDto);
  }

  @Put(':id')
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateArtistDto: ArtistDto) {
    return this.artistService.updateArtist(id, updateArtistDto);
  }

  @HttpCode(204)
  @Delete(':id')
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.artistService.deleteArtist(id);
  }
}
