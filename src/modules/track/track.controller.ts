import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { ChangeTrackDto } from './dto/change-track.dto';
import { AuthGuard } from 'src/common/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  getAll() {
    return this.trackService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.trackService.getTrack(id);
  }

  @HttpCode(201)
  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.createTrack(createTrackDto);
  }

  @Put(':id')
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateTrackDto: ChangeTrackDto) {
    return this.trackService.updateTrack(id, updateTrackDto);
  }

  @HttpCode(204)
  @Delete(':id')
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.trackService.deleteTrack(id);
  }
}
