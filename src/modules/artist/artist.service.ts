import { Injectable, NotFoundException } from '@nestjs/common';
import { ArtistRepository } from './artist.repository';
import { ArtistDto } from './dto/artist.dto';

@Injectable()
export class ArtistService {
  constructor(private artistRepository: ArtistRepository) {}

  async getAll() {
    return this.artistRepository.getAll();
  }

  async getArtist(id: string) {
    const artist = this.artistRepository.getById(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  async createArtist(createArtistDto: ArtistDto) {
    return this.artistRepository.create(createArtistDto);
  }

  async updateArtist(id: string, updateArtistDto: ArtistDto) {
    const artist = this.artistRepository.getById(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return this.artistRepository.update(id, updateArtistDto);
  }

  async deleteArtist(id: string) {
    const artist = this.artistRepository.getById(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    this.artistRepository.delete(id);
  }
}
