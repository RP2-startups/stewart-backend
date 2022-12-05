import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
    up: (queryInterface: QueryInterface): Promise<void> => queryInterface.sequelize.transaction(
        async (transaction) => {
          await queryInterface.createTable('Project_Participation', {
            id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: DataTypes.INTEGER
            },
            user_id: {
              type: DataTypes.INTEGER,
              references: { model: 'User', key: 'id' },
              onUpdate: 'CASCADE',
              onDelete: 'CASCADE',
            },
            project_id: {
              type: DataTypes.INTEGER,
              references: { model: 'Project', key: 'id' },
              onUpdate: 'CASCADE',
              onDelete: 'CASCADE',
            },
            message: {
              type: DataTypes.STRING
            },
            is_accepted:{
              type: DataTypes.ENUM("accepted","rejected","pending"),
              allowNull: false,
              defaultValue: "pending",
            },
            is_adm:{
              type: DataTypes.BOOLEAN,
              allowNull: false,
              defaultValue: false
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
          await queryInterface.dropTable("Project_Participation");
        }
    )
};