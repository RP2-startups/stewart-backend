import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: (queryInterface: QueryInterface): Promise<void> =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkInsert(
        "Project_Category",
        [
          {
            name: "tecnologia",
            created_at: new Date(),
            updated_at: new Date()
          },
          {
            name: "ciências naturais",
            created_at: new Date(),
            updated_at: new Date()
          },
          {
            name:"sociedade",
            created_at: new Date(),
            updated_at: new Date()
          },
          {
            name:"finanças",
            created_at: new Date(),
            updated_at: new Date()
          },
        ],
        {}
      );
    }),

  down: (queryInterface: QueryInterface): Promise<void> =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkDelete('Project_Category', null, {});
    }),
};
