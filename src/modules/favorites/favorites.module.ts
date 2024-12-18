import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { FavoritesRepository } from './favorites.repository';
import { ArtistModule } from '../artist/artist.module';
import { TrackModule } from '../track/track.module';
import { AlbumModule } from '../album/album.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [FavoritesController],
  providers: [JwtService, FavoritesService, FavoritesRepository],
  imports: [ArtistModule, TrackModule, AlbumModule],
})
export class FavoritesModule {}
