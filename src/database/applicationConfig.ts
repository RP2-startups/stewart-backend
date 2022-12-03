import dotenv from "dotenv";
import { Options } from "sequelize";
dotenv.config();

interface DbConfig {
  username: string;
  password: string;
  database: string;
  options: Options;
}

const config: DbConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  options: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    dialect: "postgres",
    define: {
      createdAt: "created_at",
      updatedAt: "updated_at",
      timestamps: true,
      underscored: true,
    },
  },
};

export default config;
