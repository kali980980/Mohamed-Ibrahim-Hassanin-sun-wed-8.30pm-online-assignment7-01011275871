import sequelize from "../../config/connection.js";

export const sequlize_config = sequelize;

export const dbconnection = async () => {
  try {
    await sequlize_config.authenticate();
    console.log("DataBase connected");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default sequelize;
