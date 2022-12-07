import { Optional } from "sequelize"

interface FollowAttributes{
    id: number,
    user_id : number,
    project_id : number
}

export type FollowInput = Optional<FollowAttributes, 'id'>
export type FollowOutput = Required<FollowAttributes>