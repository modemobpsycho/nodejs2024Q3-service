import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  async getFavorites() {
    return await this.favoritesService.getFavorites();
  }

  @Post('track/:id')
  async addTrackFavorite(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.addFavorite('tracks', id);
  }

  @Post('artist/:id')
  async addArtistFavorite(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.addFavorite('artists', id);
  }

  @Post('album/:id')
  async addAlbumFavorite(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.addFavorite('albums', id);
  }

  @HttpCode(204)
  @Delete('track/:id')
  async deleteTrackFavorite(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.deleteFavorite('tracks', id);
  }

  @HttpCode(204)
  @Delete('artist/:id')
  async deleteArtistFavorite(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.deleteFavorite('artists', id);
  }

  @HttpCode(204)
  @Delete('album/:id')
  async deleteAlbumFavorite(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favoritesService.deleteFavorite('albums', id);
  }
}
