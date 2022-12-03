import dotenv from "dotenv";
dotenv.config();

module.exports = {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    define: {
        createdAt:'created_at',
        updatedAt:'updated_at',
        timestamps: true,
        underscored: true
    }
};