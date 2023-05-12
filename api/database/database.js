import { Sequelize } from "sequelize";
import  env  from "../config.js"

export const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PWD, {
  host: env.DB_HOST,
  dialect: 'mysql',
});

