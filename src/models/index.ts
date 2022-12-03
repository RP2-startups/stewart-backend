'use strict';

import { Sequelize } from 'sequelize';
import User from '../models/User';
// import process = require('process');
// const env = process.env.NODE_ENV || 'DEV';
import config from '../database/applicationConfig.js';

const sequelize = new Sequelize(config.database, config.username, config.password, config.options);

User.initialize(sequelize);

User.associate(sequelize.models);

// db.Sequelize = Sequelize;

export default sequelize;
