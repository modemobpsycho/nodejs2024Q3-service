import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class FavoritesRepository {
  constructor(private prismaService: PrismaService) {}

  async getFavorites() {
    return {
      albums: await this.prismaService.album.findMany({
        where: { isFavorite: true },
        select: { id: true, name: true, year: true, artistId: true },
      }),
      artists: await this.prismaService.artist.findMany({
        where: { isFavorite: true },
        select: { id: true, name: true, grammy: true },
      }),
      tracks: await this.prismaService.track.findMany({
        where: { isFavorite: true },
        select: {
          id: true,
          name: true,
          duration: true,
          albumId: true,
          artistId: true,
        },
      }),
    };
  }

  async setFavorite(type: 'albums' | 'artists' | 'tracks', id: string, isFavorite: boolean) {
    await this.prismaService[type.slice(0, -1)].update({
      where: { id },
      data: {
        isFavorite,
      },
    });
  }
}
