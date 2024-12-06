import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TrackRepository } from './track.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [TrackController],
  providers: [JwtService, TrackService, TrackRepository],
  exports: [TrackRepository],
})
export class TrackModule {}
