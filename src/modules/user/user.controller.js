import { Router } from "express";
import * as userServices from "./services/user.services.js";

const userController = Router();

userController.post("/signup", async (req, res) => {
  try {
    const user = await userServices.registrationService(req.body);
    return res.status(201).json({ message: "user created successfully", user });
  } catch (error) {
    const status = error.message === "Email already exists" ? 409 : 400;
    return res.status(status).json({ message: error.message || "Validation error" });
  }
});

userController.put("/:id", async (req, res) => {
  try {
    const user = await userServices.updateUserByPkService(req.params.id, req.body);
    return res.status(200).json({ message: "user updated", user });
  } catch (error) {
    return res.status(400).json({ message: error.message || "Update failed" });
  }
});

userController.get("/by-email", async (req, res) => {
  try {
    const user = await userServices.findUserByEmailService(req.query.email);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(404).json({ message: error.message || "User not found" });
  }
});

userController.get("/:id", async (req, res) => {
  try {
    const user = await userServices.getUserByIdService(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(404).json({ message: error.message || "User not found" });
  }
});

userController.get("/all-users", async (req, res) => {
  try {
    const users = await userServices.listAllUsersService();
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(404).json({ message: error.message || "No users found" });
  }
});

export default userController