import { Injectable } from '@nestjs/common';
import { DB } from 'src/common/db';
import { v4 } from 'uuid';
import { ArtistDto } from './dto/artist.dto';
import { Artist } from 'src/common/interfaces/artist.interface';

@Injectable()
export class ArtistRepository {
  getAll() {
    return DB.artists;
  }

  getById(id: string) {
    return DB.artists.find((artist) => artist.id === id);
  }

  create(createArtistDto: ArtistDto) {
    const id = v4();
    DB.artists.push({
      id,
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    });
    return { ...DB.artists.find((artist) => artist.id === id) };
  }

  update(id: string, artistDto: ArtistDto) {
    let artistUpdating: Artist | undefined;
    DB.artists = DB.artists.map((artist) => {
      if (artist.id === id) {
        artistUpdating = {
          id: artist.id,
          name: artistDto.name,
          grammy: artistDto.grammy,
        };
        return artistUpdating;
      }
      return artist;
    });
    return { ...artistUpdating };
  }

  delete(id: string) {
    DB.artists = DB.artists.filter((artist) => artist.id !== id);
    DB.tracks = DB.tracks.map((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
      return track;
    });
    DB.albums = DB.albums.map((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
      return album;
    });
    DB.favorites.artists = DB.favorites.artists.filter(
      (favorite) => favorite !== id,
    );
  }
}
