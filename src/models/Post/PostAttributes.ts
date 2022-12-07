import { Optional } from "sequelize"

interface PostAttributes{
    id: number,
    project_id : number,
    title: string,
    description: string,
    picture?: string
}

export type PostInput = Optional<PostAttributes, 'id' | 'picture'>
export type PostOutput = Required<PostAttributes>