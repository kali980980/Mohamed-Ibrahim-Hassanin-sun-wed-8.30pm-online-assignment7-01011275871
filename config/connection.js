import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME || "sequelize",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT || 3306),
    dialect: "mysql",
    logging: false,
  }
);

export const dbconnection = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("DataBase connected");
    return true;
  } catch (error) {
    console.error("Database connection failed:", error.message);
    return false;
  }
};

export default sequelize;
