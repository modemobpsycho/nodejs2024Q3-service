import { Injectable } from '@nestjs/common';
import { ArtistDto } from './dto/artist.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { v4 } from 'uuid';

@Injectable()
export class ArtistRepository {
  constructor(private prismaService: PrismaService) {}

  async getAll() {
    return await this.prismaService.artist.findMany();
  }

  async getById(id: string) {
    return await this.prismaService.artist.findUnique({ where: { id } });
  }

  async create(createArtistDto: ArtistDto) {
    return await this.prismaService.artist.create({
      data: {
        id: v4(),
        name: createArtistDto.name,
        grammy: createArtistDto.grammy,
      },
    });
  }

  async update(id: string, artistDto: ArtistDto) {
    return await this.prismaService.artist.update({
      where: { id },
      data: {
        name: artistDto.name,
        grammy: artistDto.grammy,
      },
    });
  }

  async delete(id: string) {
    await this.prismaService.artist.delete({ where: { id } });
  }
}
