import { Injectable, NotFoundException } from '@nestjs/common';
import { AlbumRepository } from './album.repository';
import { AlbumDto } from './dto/album.dto';

@Injectable()
export class AlbumService {
  constructor(private albumRepository: AlbumRepository) {}

  async getAll() {
    return this.albumRepository.getAll();
  }

  async getAlbum(id: string) {
    const album = this.albumRepository.getById(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  async createAlbum(createAlbumDto: AlbumDto) {
    return this.albumRepository.create(createAlbumDto);
  }

  async updateAlbum(id: string, updateAlbumDto: AlbumDto) {
    const album = this.albumRepository.getById(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return this.albumRepository.update(id, updateAlbumDto);
  }

  async deleteAlbum(id: string) {
    const album = this.albumRepository.getById(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    this.albumRepository.delete(id);
  }
}
