import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ArtistRepository } from './artist.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ArtistController],
  providers: [JwtService, ArtistService, ArtistRepository],
  exports: [ArtistRepository],
})
export class ArtistModule {}
