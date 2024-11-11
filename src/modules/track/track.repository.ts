import { Injectable } from '@nestjs/common';
import { DB } from 'src/common/db';
import { v4 } from 'uuid';
import { TrackDto } from './dto/track.dto';
import { Track } from 'src/common/interfaces/track.interface';

@Injectable()
export class TrackRepository {
  getAll() {
    return DB.tracks;
  }

  getById(id: string) {
    return DB.tracks.find((track) => track.id === id);
  }

  create(createTrackDto: TrackDto) {
    const id = v4();
    DB.tracks.push({
      id,
      name: createTrackDto.name,
      artistId: createTrackDto.artistId,
      albumId: createTrackDto.albumId,
      duration: createTrackDto.duration,
    });
    return { ...DB.tracks.find((track) => track.id === id) };
  }

  update(id: string, updateTrackDto: TrackDto) {
    let trackUpdating: Track | undefined;
    DB.tracks = DB.tracks.map((track) => {
      if (track.id === id) {
        trackUpdating = {
          id: track.id,
          name: updateTrackDto.name,
          artistId: updateTrackDto.artistId,
          albumId: updateTrackDto.albumId,
          duration: updateTrackDto.duration,
        };
        return trackUpdating;
      }
      return track;
    });
    return { ...trackUpdating };
  }

  delete(id: string) {
    DB.tracks = DB.tracks.filter((track) => track.id !== id);
    DB.favorites.tracks = DB.favorites.tracks.filter(
      (favorite) => favorite !== id,
    );
  }
}
