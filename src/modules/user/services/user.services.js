import User from "../../../DB/models/user.model.js";

export const registrationService = async (data) => {
  const existingUser = await User.findOne({ where: { email: data.email } });
  if (existingUser) {
    throw new Error("Email already exists");
  }

  const user = await User.build(data);
  await user.validate();
  await user.save();

  const plainUser = user.toJSON();
  delete plainUser.password;
  return plainUser;
};

export const updateUserByPkService = async (id, data) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error("User not found");
  }

  await user.update(data, { validate: false, fields: Object.keys(data) });

  const plainUser = user.toJSON();
  delete plainUser.password;
  return plainUser;
};

export const findUserByEmailService = async (email) => {
  const user = await User.findOne({
    where: { email },
    attributes: { exclude: ["password"] },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const getUserByIdService = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ["password", "role"] },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const listAllUsersService = async () => {
  return await User.findAll({
    attributes: { exclude: ["password"] },
    order: [["id", "DESC"]],
  });
};

