import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { ChangeAlbumDto } from './dto/change-album.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { v4 } from 'uuid';

@Injectable()
export class AlbumRepository {
  constructor(private prismaService: PrismaService) {}

  async getAll() {
    return await this.prismaService.album.findMany();
  }

  async getById(id: string) {
    return await this.prismaService.album.findUnique({ where: { id } });
  }

  async create(createAlbumDto: CreateAlbumDto) {
    return await this.prismaService.album.create({
      data: {
        id: v4(),
        name: createAlbumDto.name,
        artist: createAlbumDto.artistId ? { connect: { id: createAlbumDto.artistId } } : undefined,
        year: createAlbumDto.year,
      },
    });
  }

  async update(id: string, updateAlbumDto: ChangeAlbumDto) {
    return await this.prismaService.album.update({
      where: { id },
      data: {
        name: updateAlbumDto.name,
        year: updateAlbumDto.year,
        artist: updateAlbumDto.artistId ? { connect: { id: updateAlbumDto.artistId } } : undefined,
      },
    });
  }

  async delete(id: string) {
    await this.prismaService.album.delete({ where: { id } });
  }
}
