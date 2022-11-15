import dotenv = require('dotenv');
dotenv.config();

module.exports = {
    
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "postgres",
        define: {
            createdAt:'created_at',
            updatedAt:'updated_at',
            timestamps: true,
            underscored: true
        }
}