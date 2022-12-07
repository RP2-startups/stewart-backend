"use strict";
import { Model, Sequelize, DataTypes, ModelStatic } from "sequelize";
import { PostInput, PostOutput } from "./PostAttributes";

class Post
  extends Model<PostInput, PostOutput>
  implements PostOutput
{
  declare id: number;
  declare project_id: number;
  declare title: string;
  declare description: string;
  declare picture: string;

  static initialize(sequelize: Sequelize) {
    return this.init({
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      picture: DataTypes.STRING,
      project_id: DataTypes.INTEGER
    }, {
      sequelize,
      modelName: 'Post',
      tableName: 'Post'
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
  }
}

export default Post;
