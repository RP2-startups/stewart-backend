'use strict';

import { Sequelize } from 'sequelize';
import User from './User/User';
// import process = require('process');
// const env = process.env.NODE_ENV || 'DEV';
import config from '../database/applicationConfig.js';
import Project from './Project/Project';
import ProjectParticipation from './Project/ProjectParticipation';

const sequelize = new Sequelize(config.database, config.username, config.password, config.options);

User.initialize(sequelize);
Project.initialize(sequelize);
ProjectParticipation.initialize(sequelize);

User.associate(sequelize.models);
Project.associate(sequelize.models);
ProjectParticipation.associate(sequelize.models);

// db.Sequelize = Sequelize;

export default sequelize;
