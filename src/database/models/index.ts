'use strict';

import fs = require('fs');
import path = require('path');
import { Sequelize, DataTypes } from 'sequelize';
// import process = require('process');
const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'DEV';
import config = require('../config');
const selectedConfig = config;

interface DbSequelizeConfig {
  sequelize: Sequelize;
}

let db: DbSequelizeConfig;

const sequelize = new Sequelize(selectedConfig);

fs
  .readdirSync(__dirname+"/models")
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts');
  })
  .forEach(async file => {
    const modelConstructor = await import(path.join(__dirname, file));
    const model = modelConstructor(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
// db.Sequelize = Sequelize;

module.exports = db;
