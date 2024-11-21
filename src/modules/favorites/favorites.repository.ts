import { Injectable } from '@nestjs/common';
import { DB } from 'src/common/db';
import { Favorites } from 'src/common/interfaces/favorites.interface';

@Injectable()
export class FavoritesRepository {
  getFavorites() {
    return DB.favorites;
  }

  addFavorite(type: keyof Favorites, id: string) {
    DB.favorites[type].push(id);
  }

  deleteFavorite(type: keyof Favorites, id: string) {
    DB.favorites[type] = DB.favorites[type].filter(
      (favorite) => favorite !== id,
    );
  }
}
