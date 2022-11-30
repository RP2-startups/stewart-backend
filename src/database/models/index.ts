'use strict';

import fs from 'fs';
import path  from 'path';
import { Sequelize, DataTypes } from 'sequelize';
// import process = require('process');
const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'DEV';
import config from '../applicationConfig.js';

interface DbSequelizeConfig {
  sequelize: Sequelize;
}

let DbConfig: DbSequelizeConfig;

const sequelize = new Sequelize(config.database, config.username, config.password, config.options);

fs
  .readdirSync(__dirname+"/models")
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts');
  })
  .forEach(async file => {
    const modelConstructor = await import(path.join(__dirname, file));
    const model = modelConstructor(sequelize, DataTypes);
    DbConfig[model.name] = model;
  });

Object.keys(DbConfig).forEach(modelName => {
  if (DbConfig[modelName].associate) {
    DbConfig[modelName].associate(DbConfig);
  }
  if(DbConfig[modelName].init)
    DbConfig[modelName].init(sequelize);
});

DbConfig.sequelize = sequelize;
// db.Sequelize = Sequelize;

export default DbConfig;
