import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { ChangeTrackDto } from './dto/change-track.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { v4 } from 'uuid';

@Injectable()
export class TrackRepository {
  constructor(private prismaService: PrismaService) {}

  async getAll() {
    return await this.prismaService.track.findMany();
  }

  async getById(id: string) {
    return await this.prismaService.track.findUnique({ where: { id } });
  }

  async create(createTrackDto: CreateTrackDto) {
    return await this.prismaService.track.create({
      data: {
        id: v4(),
        name: createTrackDto.name,
        artist: createTrackDto.artistId
          ? { connect: { id: createTrackDto.artistId } }
          : undefined,
        album: createTrackDto.albumId
          ? { connect: { id: createTrackDto.albumId } }
          : undefined,
        duration: createTrackDto.duration,
      },
    });
  }

  async update(id: string, updateTrackDto: ChangeTrackDto) {
    return await this.prismaService.track.update({
      where: { id },
      data: {
        name: updateTrackDto.name,
        duration: updateTrackDto.duration,
      },
    });
  }

  async delete(id: string) {
    await this.prismaService.track.delete({ where: { id } });
  }
}
