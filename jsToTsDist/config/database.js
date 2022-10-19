"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    define: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        timestamps: true,
        underscored: true
    }
};
//# sourceMappingURL=database.js.map