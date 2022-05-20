import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";
import { CreateTrackDto } from "./dto/create-track.dto";
import { ITrack } from "./track.model";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { IComment } from "./comment.model";
import { FileService, FileType } from "../file/file.service";


@Injectable()
export class TrackService {

    constructor(private readonly prismaService: PrismaService,
                private readonly fileService: FileService) {
    }

    async create(dto: CreateTrackDto, picture, audio): Promise<ITrack> {

        const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture);

        const track: ITrack = await this.prismaService.track.create({
            data: {
                ...dto,
                audio: audioPath,
                picture: picturePath
            }
        })

        return track;
    }



    async getAll(count = 10, offset = 0): Promise<ITrack[]> {
        const tracks: ITrack[] = await this.prismaService.track.findMany({
            skip: offset,
            take: count,
            include: {
                comments: true
            }
        });

        return tracks;
    }

    async getOne(id: number): Promise<ITrack> {
        const track: ITrack = await this.prismaService.track.findUnique({
            where: {
                id
            },
            include: {
                comments: true
            }
        });

        return track;
    }

    async delete(id: number): Promise<number> {
        const comments = await this.prismaService.comment.deleteMany({
            where: {
                trackId: id
            }
        });

        const track: ITrack = await this.prismaService.track.delete({
            where: {
                id
            }
        });

        return track.id;
    }

    async addComment(dto: CreateCommentDto): Promise<IComment> {
        const track: ITrack = await this.prismaService.track.findUnique({
            where: {
                id: dto.trackId
            }
        })

        if (!track) throw new Error("Track not found");

        const comment = await this.prismaService.comment.create({
            data: {
                ...dto
            }
        })

        return comment;
    }

    async listen(id: number) {
        await this.prismaService.track.update({
            where: {
                id
            },
            data: {
                listens: {
                    increment: 1
                }
            }
        })
    }

    async search(query: string): Promise<ITrack[]> {
        const tracks: ITrack[] = await this.prismaService.track.findMany({
            where: {
                name: {
                    contains: query,
                    mode: 'insensitive',
                }
            },
            include: {
                comments: true
            }
        });

        return tracks;
    }
}
