import { Injectable, NotFoundException } from '@nestjs/common';
import { AlbumRepository } from './album.repository';
import { CreateAlbumDto } from './dto/create-album.dto';

@Injectable()
export class AlbumService {
  constructor(private albumRepository: AlbumRepository) {}

  async getAll() {
    return await this.albumRepository.getAll();
  }

  async getAlbum(id: string) {
    const album = await this.albumRepository.getById(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  async createAlbum(createAlbumDto: CreateAlbumDto) {
    return await this.albumRepository.create(createAlbumDto);
  }

  async updateAlbum(id: string, updateAlbumDto: CreateAlbumDto) {
    const album = await this.albumRepository.getById(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return await this.albumRepository.update(id, updateAlbumDto);
  }

  async deleteAlbum(id: string) {
    const album = await this.albumRepository.getById(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    await this.albumRepository.delete(id);
  }
}
