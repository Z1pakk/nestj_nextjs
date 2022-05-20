import { Module } from "@nestjs/common";
import { TrackModule } from './track/track.module';
import { PrismaModule } from './prisma/prisma.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from 'path'

@Module({
  imports: [
      ServeStaticModule.forRoot({
        rootPath: path.resolve(__dirname, 'static'),
      }),
      TrackModule,
      PrismaModule,
      FileModule
  ],
})
export class AppModule {

}
