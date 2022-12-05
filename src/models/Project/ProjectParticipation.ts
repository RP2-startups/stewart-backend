"use strict";
import { Model, Sequelize, DataTypes, ModelStatic } from "sequelize";
import { ProjectParticipationOutput, ProjectParticipationInput, isAcceptedTypes } from "./ProjectAttributes";

class ProjectParticipation
  extends Model<ProjectParticipationInput, ProjectParticipationOutput>
  implements ProjectParticipationOutput
{
  declare id: number;
  declare user_id: number;
  declare project_id: number;
  declare message: string;
  declare is_accepted: string;
  declare is_adm: boolean;


  static initialize(sequelize: Sequelize) {
    return this.init(
      {
        user_id: DataTypes.NUMBER,
        project_id: DataTypes.NUMBER,
        is_adm: DataTypes.BOOLEAN,
        is_accepted: DataTypes.ENUM("pending","accepted","rejected"),
        message: DataTypes.STRING
      },
      {
        sequelize,
        modelName: "Project_Participation",
        tableName: "Project_Participation",
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
    this.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
    this.belongsTo(models.Project, {
      foreignKey: "project_id",
      as: "project",
    });  
  }
}

export default ProjectParticipation;
