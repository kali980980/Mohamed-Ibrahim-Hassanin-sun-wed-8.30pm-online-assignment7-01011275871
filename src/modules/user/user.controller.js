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

userController.delete("/:id", async (req, res) => {
  try {
    const result = await userServices.deleteUserService(req.params.id);
    return res.status(200).json(result);
  } catch (error) {
    const status = error.message === "User not found" ? 404 : 400;
    return res.status(status).json({ message: error.message || "Delete failed" });
  }
});

userController.get("/by-email", async (req, res) => {
  try {
    const email = req.query.email;
    const user = await userServices.findUserByEmailService(email);
    return res.status(200).json(user);
  } catch (error) {
    const status = error.message === "Email is required" ? 400 : 404;
    return res.status(status).json({ message: error.message || "User not found" });
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

userController.get("/:id", async (req, res) => {
  try {
    const user = await userServices.getUserByIdService(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(404).json({ message: error.message || "User not found" });
  }
});

export default userController;

