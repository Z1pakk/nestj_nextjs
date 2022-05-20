import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { PrismaModule } from "../prisma/prisma.module";
import { FileService } from "../file/file.service";

@Module({
  imports: [PrismaModule],
  providers: [TrackService, FileService],
  controllers: [TrackController]
})
export class TrackModule {}
