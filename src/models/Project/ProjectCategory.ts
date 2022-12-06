"use strict";
import { Model, Sequelize, DataTypes, ModelStatic } from "sequelize";
import { ProjectCategoryOutput, ProjectCategoryInput } from "./ProjectAttributes";

class ProjectCategory
  extends Model<ProjectCategoryInput, ProjectCategoryOutput>
  implements ProjectCategoryOutput
{
  declare id: number;
  declare name: string;

  static initialize(sequelize: Sequelize) {
    return this.init(
      {
        name: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: "ProjectCategory",
        tableName: "Project_Category",
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
    this.hasMany(models.ProjectCategoryCategory, {
      foreignKey: "project_category_id",
      as: "categoryProjects",
    });
  }
}

export default ProjectCategory;

