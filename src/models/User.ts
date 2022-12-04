'use strict';
import { Model, Sequelize, DataTypes} from "sequelize";
import { UserInput, UserOutput } from "./User/UserAttributes";


class User extends Model<UserInput, UserOutput> implements UserOutput {
    declare id: number;
    declare name: string;
    declare email: string;
    declare profile_picture: string;
    declare about: string;
    declare password: string;

    static initialize(sequelize : Sequelize){
      return this.init({
        name: DataTypes.STRING(50),
        email: DataTypes.STRING(100),
        profile_picture: DataTypes.STRING,
        about: DataTypes.STRING,
        password: DataTypes.STRING
      }, {
        sequelize:sequelize,
        tableName: "User",
        modelName: "User"
      })
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  
export default User;