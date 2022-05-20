import { ITrack } from "./track.model";

export interface IComment {
    readonly id: number
    readonly createdAt: Date
    readonly updatedAt: Date

    readonly username: string
    readonly text: string

    readonly trackId: number
    readonly track?: ITrack
}
