import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
    up: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
        async (transaction) => {
          await queryInterface.sequelize.query(`alter type "enum_Project_Participation_is_accepted" add value 'request_to_adm'`)
        }
    ),

    down: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
        async (transaction) => {
          // await queryInterface.removeColumn("User","password");
        }
    )
};