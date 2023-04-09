import bcrypt from "bcryptjs";
import db from "../models";
const salt = bcrypt.genSaltSync(10); //for hash password

//Create new users
let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await db.User.create({
        firstName: data.firstname,
        lastName: data.lastname,
        email: data.email,
        password: hashPasswordFromBcrypt,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender === "1" ? true : false,
        roleId: data.roleId,
      });
      resolve("ok! create successfully");
    } catch (error) {
      reject(error);
    }
  });
};

let showAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = db.User.findAll({
        raw: true,
      });
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

let getUserInfoById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
        raw: true,
      });
      if (user) {
        resolve(user);
      } else {
        resolve({});
      }
    } catch (error) {
      reject(error);
    }
  });
};

let updateData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
      });
      user.set({
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender,
        roleId: data.roleId,
      });
      await user.save();
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

let deleteUserById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: id },
      });
      await user.destroy();
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

//exports
module.exports = {
  createNewUser: createNewUser,
  showAllUser: showAllUser,
  getUserInfoById: getUserInfoById,
  updateData: updateData,
  deleteUserById: deleteUserById,
};

//function for hash password
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};
