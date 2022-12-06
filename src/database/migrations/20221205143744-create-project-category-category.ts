import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
    up: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
        async (transaction) => {
    await queryInterface.createTable('Project_Category_Category', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      project_id: {
        type: DataTypes.INTEGER,
        references: { model: 'Project', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      project_category_id: {
        type: DataTypes.INTEGER,
        references: { model: 'Project_Category', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
        await queryInterface.dropTable("Project_Category");
      }
  )
};