"use strict";
import { Model, Sequelize, DataTypes, ModelStatic } from "sequelize";
import { ProjectCategoryCategoryOutput, ProjectCategoryCategoryInput } from "./ProjectAttributes";

class ProjectCategoryCategory
  extends Model<ProjectCategoryCategoryInput, ProjectCategoryCategoryOutput>
  implements ProjectCategoryCategoryOutput
{
  declare id: number;
  declare project_id: number;
  declare project_category_id: number;

  static initialize(sequelize: Sequelize) {
    return this.init({
      project_id: DataTypes.NUMBER,
      project_category_id: DataTypes.NUMBER
    }, {
      sequelize,
      modelName: 'ProjectCategoryCategory',
      tableName: 'Project_Category_Category',
    });
  }
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: {
    [key: string]: ModelStatic<Model<unknown, unknown>>;
  }) {
    this.belongsTo(models.Project, {
      foreignKey: "project_id",
      as: "project",
    });
    this.belongsTo(models.ProjectCategory, {
      foreignKey: "project_category_id",
      as: "category",
    });
    
  }
}

export default ProjectCategoryCategory;


