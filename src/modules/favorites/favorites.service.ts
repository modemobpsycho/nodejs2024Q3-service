import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesRepository } from './favorites.repository';
import { TrackRepository } from '../track/track.repository';
import { AlbumRepository } from '../album/album.repository';
import { ArtistRepository } from '../artist/artist.repository';
import { Favorites } from 'src/common/interfaces/favorites.interface';

@Injectable()
export class FavoritesService {
  constructor(
    private favoritesRepository: FavoritesRepository,
    private artistRepository: ArtistRepository,
    private albumRepository: AlbumRepository,
    private trackRepository: TrackRepository,
  ) {}

  async getFavorites() {
    const favoritesIds = this.favoritesRepository.getFavorites();
    return {
      artists: favoritesIds.artists.map((id) =>
        this.artistRepository.getById(id),
      ),
      albums: favoritesIds.albums.map((id) => this.albumRepository.getById(id)),
      tracks: favoritesIds.tracks.map((id) => this.trackRepository.getById(id)),
    };
  }

  async addFavorite(type: keyof Favorites, id: string) {
    const favorite = this[`${type.slice(0, -1)}Repository`].getById(id);
    if (!favorite) {
      throw new UnprocessableEntityException(
        `${type[0].toUpperCase()}${type.slice(1)} not found`,
      );
    }
    this.favoritesRepository.addFavorite(type, id);
  }

  async deleteFavorite(type: keyof Favorites, id: string) {
    const isFavorite = Object.values(this.favoritesRepository.getFavorites())
      .flat()
      .some((favorite) => favorite === id);
    if (!isFavorite) {
      throw new NotFoundException(
        `${type[0].toUpperCase()}${type.slice(1)} not found`,
      );
    }
    this.favoritesRepository.deleteFavorite(type, id);
  }
}
