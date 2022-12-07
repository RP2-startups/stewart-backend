"use strict";
import { Model, Sequelize, DataTypes, ModelStatic } from "sequelize";
import { FollowOutput } from "./FollowAttributes.js";
import { FollowInput } from "./FollowAttributes.js";

class Follow
  extends Model<FollowInput, FollowOutput>
  implements FollowOutput
{
  declare id: number;
  declare user_id: number;
  declare project_id: number;

  static initialize(sequelize: Sequelize) {
    return this.init({
      user_id: DataTypes.INTEGER,
      project_id: DataTypes.INTEGER
    }, {
      sequelize,
      modelName: 'Follow',
      tableName: 'Follow'
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

export default Follow;