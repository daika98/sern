import db from "../models";
import bcrypt from "bcryptjs/dist/bcrypt";
const salt = bcrypt.genSaltSync(10); //for hash password

//Create new users
let handleUserLogin = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isExitUser = await checkUserEmail(email);
      let user = await db.User.findOne({
        where: { email: email },
        raw: true,
      });
      let userData = {};
      if (isExitUser) {
        let check = await bcrypt.compareSync(password, user.password);
        if (check) {
          userData.code = 3;
          userData.message = "Successfully";
          delete user.password;
          userData.userInfo = user;
        } else {
          userData.code = 2;
          userData.message = "Password is not correct";
        }
      } else {
        userData.code = 1;
        userData.message = "User not exist";
      }
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }

      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resolve({
          code: 4,
          message: "Email exits",
        });
      } else {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        await db.User.create({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: hashPasswordFromBcrypt,
          address: data.address,
          phoneNumber: data.phoneNumber,
          gender: data.gender === "1" ? true : false,
          roleId: data.roleId,
        });
        resolve({
          code: 3,
          message: "Successfully",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
      });
      if (!user) {
        resolve({
          code: 1,
          message: "User not exits",
        });
      }
      await user.destroy();
      resolve({
        code: 3,
        message: "Delete Successfully",
      });
    } catch (error) {
      reject(error);
    }
  });
};

let updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        user.set({
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phoneNumber: data.phoneNumber,
          gender: data.gender,
          roleId: data.roleId,
        });
        await user.save();
        resolve({
          code: 3,
          message: "Update successfully",
        });
      } else {
        resolve({
          code: 1,
          message: "User not exits",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

//exports
module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  updateUser: updateUser,
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
