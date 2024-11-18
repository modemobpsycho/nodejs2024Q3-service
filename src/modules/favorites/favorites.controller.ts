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
  getFavorites() {
    return this.favoritesService.getFavorites();
  }

  @Post('track/:id')
  addTrackFavorite(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.addFavorite('tracks', id);
  }

  @Post('artist/:id')
  addArtistFavorite(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.addFavorite('artists', id);
  }

  @Post('album/:id')
  addAlbumFavorite(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.addFavorite('albums', id);
  }

  @HttpCode(204)
  @Delete('track/:id')
  deleteTrackFavorite(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.deleteFavorite('tracks', id);
  }

  @HttpCode(204)
  @Delete('artist/:id')
  deleteArtistFavorite(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.deleteFavorite('artists', id);
  }

  @HttpCode(204)
  @Delete('album/:id')
  deleteAlbumFavorite(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.deleteFavorite('albums', id);
  }
}
