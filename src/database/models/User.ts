'use strict';
import { Model, Sequelize, DataTypes} from "sequelize";


class User extends Model {
    init(sequelize : Sequelize){
      User.init({
        user_id: DataTypes.INTEGER,
        name: DataTypes.STRING(50),
        email: DataTypes.STRING(100),
        profile_picture: DataTypes.STRING,
        about: DataTypes.STRING
      }, {
        sequelize
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