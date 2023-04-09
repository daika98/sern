import { json } from "body-parser";
import db from "../models";
import UserService from "../services/UserService";

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(200).json({
      code: 0,
      message: "Missing email or password",
    });
  }
  let userData = await UserService.handleUserLogin(email, password);
  return res.status(200).json({
    code: userData.code,
    message: userData.message,
    user: userData.userInfo ? userData.userInfo : {},
  });
};

let handleGetAllUsers = async (req, res) => {
  let id = req.query.id;

  if (!id) {
    return res.status(200).json({
      code: 1,
      message: "Missing parameters",
    });
  }
  let users = await UserService.getAllUsers(id);
  return res.status(200).json({
    code: 3,
    message: "Sucessfully",
    users,
  });
};

let handleCreateNewUser = async (req, res) => {
  let message = await UserService.createNewUser(req.body);
  return res.status(200).json(message);
};

let handleDeleteUser = async (req, res) => {
  let id = req.body.id;

  let message = await UserService.deleteUser(id);
  return res.status(200).json(message);
};

let handleEditUser = async (req, res) => {
  let data = req.body;
  // console.log("Data", data);
  if (!data.id) {
    return res.status(200).json({
      code: 0,
      message: "Missing parameter",
    });
  }
  let message = await UserService.updateUser(data);
  return res.status(200).json(message);
};

module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUser: handleCreateNewUser,
  handleDeleteUser: handleDeleteUser,
  handleEditUser: handleEditUser,
};
