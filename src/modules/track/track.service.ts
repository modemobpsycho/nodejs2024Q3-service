import { Injectable, NotFoundException } from '@nestjs/common';
import { TrackRepository } from './track.repository';
import { CreateTrackDto } from './dto/create-track.dto';
import { ChangeTrackDto } from './dto/change-track.dto';

@Injectable()
export class TrackService {
  constructor(private trackRepository: TrackRepository) {}

  async getAll() {
    return await this.trackRepository.getAll();
  }

  async getTrack(id: string) {
    const track = await this.trackRepository.getById(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return track;
  }

  async createTrack(createTrackDto: CreateTrackDto) {
    return await this.trackRepository.create(createTrackDto);
  }

  async updateTrack(id: string, updateTrackDto: ChangeTrackDto) {
    const track = await this.trackRepository.getById(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    return await this.trackRepository.update(id, updateTrackDto);
  }

  async deleteTrack(id: string) {
    const track = await this.trackRepository.getById(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    await this.trackRepository.delete(id);
  }
}
