import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesRepository } from './favorites.repository';
import { TrackRepository } from '../track/track.repository';
import { AlbumRepository } from '../album/album.repository';
import { ArtistRepository } from '../artist/artist.repository';

@Injectable()
export class FavoritesService {
  constructor(
    private favoritesRepository: FavoritesRepository,
    private artistRepository: ArtistRepository,
    private albumRepository: AlbumRepository,
    private trackRepository: TrackRepository,
  ) {}

  async getFavorites() {
    return await this.favoritesRepository.getFavorites();
  }

  async addFavorite(type: 'albums' | 'artists' | 'tracks', id: string) {
    const favorite = await this[`${type.slice(0, -1)}Repository`].getById(id);
    if (!favorite) {
      throw new UnprocessableEntityException(
        `${type[0].toUpperCase()}${type.slice(1)} not found`,
      );
    }
    await this.favoritesRepository.setFavorite(type, id, true);
  }

  async deleteFavorite(type: 'albums' | 'artists' | 'tracks', id: string) {
    const isFavorite = Object.values(
      await this.favoritesRepository.getFavorites(),
    )
      .flat()
      .some((favorite) => favorite.id === id);
    if (!isFavorite) {
      throw new NotFoundException(
        `${type[0].toUpperCase()}${type.slice(1)} not found`,
      );
    }
    await this.favoritesRepository.setFavorite(type, id, false);
  }
}
