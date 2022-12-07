'use strict';

import { Sequelize } from 'sequelize';
import User from './User/User';
// import process = require('process');
// const env = process.env.NODE_ENV || 'DEV';
import config from '../database/applicationConfig.js';
import Project from './Project/Project';
import ProjectParticipation from './Project/ProjectParticipation';
import ProjectCategory from './Project/ProjectCategory';
import ProjectCategoryCategory from './Project/ProjectCategoryCategory';
import Post from './Post/Post';
import Follow from './Follow/Follow';

const sequelize = new Sequelize(config.database, config.username, config.password, config.options);

User.initialize(sequelize);
Project.initialize(sequelize);
ProjectCategory.initialize(sequelize);
ProjectParticipation.initialize(sequelize);
ProjectCategoryCategory.initialize(sequelize);
Post.initialize(sequelize);
Follow.initialize(sequelize);

User.associate(sequelize.models);
Project.associate(sequelize.models);
ProjectCategory.associate(sequelize.models);
ProjectParticipation.associate(sequelize.models);
ProjectCategoryCategory.associate(sequelize.models);
Post.associate(sequelize.models);
Follow.associate(sequelize.models);

// db.Sequelize = Sequelize;

export default sequelize;
