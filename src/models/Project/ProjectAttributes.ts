import { Optional } from "sequelize"

export enum isAcceptedTypes{
  "pending","accepted","rejected"
}

interface ProjectAttributes{
    id: number,
    name: string,
    description: string,
    picture?: string,
    background_picture?: string
}

export type ProjectInput = Optional<ProjectAttributes, 'id' | 'background_picture'>
export type ProjectOutput = Required<ProjectAttributes>

export type ProjectParticipationAttributes = {
  id: number;
  user_id:number,
  project_id:number,
  message?:string,
  is_accepted?:string,
  is_adm?:boolean
};

export type ProjectParticipationOutput = Required<ProjectParticipationAttributes>
export type ProjectParticipationInput = Optional<ProjectParticipationAttributes, 'id' | 'message' | 'is_accepted' | 'is_adm'>
