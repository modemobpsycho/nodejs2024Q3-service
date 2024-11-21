import { Injectable } from '@nestjs/common';
import { DB } from 'src/common/db';
import { v4 } from 'uuid';
import { AlbumDto } from './dto/album.dto';
import { Album } from 'src/common/interfaces/album.interface';

@Injectable()
export class AlbumRepository {
  getAll() {
    return DB.albums;
  }

  getById(id: string) {
    return DB.albums.find((album) => album.id === id);
  }

  create(createAlbumDto: AlbumDto) {
    const id = v4();
    DB.albums.push({
      id,
      name: createAlbumDto.name,
      artistId: createAlbumDto.artistId,
      year: createAlbumDto.year,
    });
    return { ...DB.albums.find((album) => album.id === id) };
  }

  update(id: string, updateAlbumDto: AlbumDto) {
    let albumUpdating: Album | undefined;
    DB.albums = DB.albums.map((album) => {
      if (album.id === id) {
        albumUpdating = {
          id: album.id,
          name: updateAlbumDto.name,
          artistId: updateAlbumDto.artistId,
          year: updateAlbumDto.year,
        };
        return albumUpdating;
      }
      return album;
    });
    return { ...albumUpdating };
  }

  delete(id: string) {
    DB.albums = DB.albums.filter((album) => album.id !== id);
    DB.tracks = DB.tracks.map((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
      return track;
    });
    DB.favorites.albums = DB.favorites.albums.filter(
      (favorite) => favorite !== id,
    );
  }
}
