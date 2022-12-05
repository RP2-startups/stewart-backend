"use strict";
import { Model, Sequelize, DataTypes, ModelStatic } from "sequelize";
import { ProjectInput, ProjectOutput } from "./ProjectAttributes";

class Project
  extends Model<ProjectInput, ProjectOutput>
  implements ProjectOutput
{
  declare id: number;
  declare name: string;
  declare description: string;
  declare picture: string;
  declare background_picture: string;

  static initialize(sequelize: Sequelize) {
    return this.init(
      {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        picture: DataTypes.STRING,
        background_picture: DataTypes.STRING,
      },
      {
        sequelize: sequelize,
        modelName: "Project",
        tableName: "Project"
      }
    );
  }
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: {
    [key: string]: ModelStatic<Model<unknown, unknown>>;
  }) {
  //   this.hasMany(models.ProjectParticipation, {
  //     foreignKey: 'project_id',
  //     as: 'projectParticipations'
  // });
  }
}

export default Project;
