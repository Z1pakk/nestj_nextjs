import { IComment } from "./comment.model";

export interface ITrack {
    readonly id: number
    readonly createdAt: Date
    readonly updatedAt: Date
    readonly name: string
    readonly artist: string
    readonly text: string
    readonly listens: number
    readonly picture?: string
    readonly audio: string
    readonly albumId?: number
    readonly comments?: IComment[];
}
