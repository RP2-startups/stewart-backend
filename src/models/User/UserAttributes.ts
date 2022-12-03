import { Optional } from "sequelize";

interface UserAttributes{
    id: number,
    name: string,
    email: string,
    profile_picture?: string,
    about?: string
}

export type UserInput = Optional<UserAttributes, 'id' | 'profile_picture' | 'about'>
export type UserOutput = Required<UserAttributes>