import { QueryInterface, DataTypes, QueryTypes } from 'sequelize';

module.exports = {
    up: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
        async (transaction) => {
          await queryInterface.createTable("User",{
            id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: DataTypes.INTEGER
            },
            name:{
              allowNull:false,
              type:DataTypes.STRING(50)
            },
            email: {
              allowNull: false,
              type: DataTypes.STRING(100)
            },
            profile_picture: {
              allowNull: true,
              type: DataTypes.STRING
            },
            about: {
              allowNull: true,
              type: DataTypes.STRING
            }
          });
        }
    ),

    down: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
        async (transaction) => {
          await queryInterface.dropTable("User");
        }
    )
};