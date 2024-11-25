import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AlbumRepository } from './album.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AlbumController],
  providers: [JwtService, AlbumService, AlbumRepository],
  exports: [AlbumRepository],
})
export class AlbumModule {}
