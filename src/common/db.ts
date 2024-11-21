import { Album } from './interfaces/album.interface';
import { Artist } from './interfaces/artist.interface';
import { Favorites } from './interfaces/favorites.interface';
import { Track } from './interfaces/track.interface';
import { User } from './interfaces/user.interface';

interface DB {
  users: User[];
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
  favorites: Favorites;
}

export const DB: DB = {
  users: [],
  artists: [],
  albums: [],
  tracks: [],
  favorites: { artists: [], albums: [], tracks: [] },
};
