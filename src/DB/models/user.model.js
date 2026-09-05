import { DataTypes } from "sequelize";
import Note from "./note.model.js";
import sequelize from "../../../config/connection.js";



const user = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 30],
      },
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        checkPasswordLength(value) {
          if (value.length <= 6) {
            throw new Error("password must be greater than 6 characters");
          }
        },
      },
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      allowNull: false,
      defaultValue: "user",
      validate: {
        isIn: [["user", "admin"]],
      },
    },
  },
  {
    tableName: "users",
    timestamps: true,
    paranoid: true,
  }
);

user.beforeCreate((userInstance) => {
  if (userInstance.name && userInstance.name.length <= 2) {
    throw new Error("name must be greater than 2 characters");
  }
});

export default user;

user.hasMany(Note, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  as: "notes",
});

Note.belongsTo(user, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  as: "user",
});


