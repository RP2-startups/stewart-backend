import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
    up: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
        async (transaction) => {
          await queryInterface.addColumn("User", "created_at", {
            type: DataTypes.DATE,
            allowNull: false
          });
          await queryInterface.addColumn("User", "updated_at", {
            type: DataTypes.DATE,
            allowNull: false
          });
          
        }
    ),

    down: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
        async (transaction) => {
          await queryInterface.removeColumn("User","created_at");
          await queryInterface.removeColumn("User","updated_at");
        }
    )
};