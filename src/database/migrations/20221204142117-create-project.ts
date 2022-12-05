import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
    up: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
        async (transaction) => {
          await queryInterface.createTable('Project', {
            id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: DataTypes.INTEGER
            },
            name: {
              type: DataTypes.STRING,
              allowNull: false
            },
            description: {
              type: DataTypes.STRING,
              allowNull: false
            },
            picture: {
              type: DataTypes.STRING,
            },
            background_picture: {
              type: DataTypes.STRING
            },
            created_at: {
              allowNull: false,
              type: DataTypes.DATE
            },
            updated_at: {
              allowNull: false,
              type: DataTypes.DATE
            }
          });
        }
    ),

    down: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
        async (transaction) => {
          await queryInterface.dropTable("Project");
        }
    )
};