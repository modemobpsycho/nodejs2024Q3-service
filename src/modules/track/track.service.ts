import { Injectable, NotFoundException } from '@nestjs/common';
import { TrackRepository } from './track.repository';
import { TrackDto } from './dto/track.dto';

@Injectable()
export class TrackService {
  constructor(private trackRepository: TrackRepository) {}

  async getAll() {
    return this.trackRepository.getAll();
  }

  async getTrack(id: string) {
    const track = this.trackRepository.getById(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  async createTrack(createTrackDto: TrackDto) {
    return this.trackRepository.create(createTrackDto);
  }

  async updateTrack(id: string, updateTrackDto: TrackDto) {
    const track = this.trackRepository.getById(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return this.trackRepository.update(id, updateTrackDto);
  }

  async deleteTrack(id: string) {
    const track = this.trackRepository.getById(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    this.trackRepository.delete(id);
  }
}
