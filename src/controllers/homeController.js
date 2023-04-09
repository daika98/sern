import { json } from "body-parser";
import db from "../models";
import CRUDService from "../services/CRUDService";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();

    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
};
//[GET] /crud
let getcrud = (req, res) => {
  return res.render("create-crud.ejs");
};

//[POST] /post-crud
let postcrud = async (req, res) => {
  let message = await CRUDService.createNewUser(req.body);
  return res.redirect("/list-users");
};
//[GET] /list-users
let showTableUsers = async (req, res) => {
  let data = await CRUDService.showAllUser();
  return res.render("list-users", {
    tableData: data,
  });
};

//[GET] /edit-crud
let editcrud = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await CRUDService.getUserInfoById(userId);
    return res.render("edit-crud.ejs", {
      userData: userData,
    });
    // console.log(UserData);
  } else {
    res.send("User not found");
  }
};

//[PUT] /put-crud

let putcrud = async (req, res) => {
  let data = req.body;
  await CRUDService.updateData(data);
  return res.redirect("/list-users");
};

//[DELETE] /delete-crud
let deletecrud = async (req, res) => {
  let id = req.query.id;
  if (id) {
    await CRUDService.deleteUserById(id);
  } else {
    res.send("User not found");
  }
  return res.redirect("/list-users");
};

module.exports = {
  getHomePage: getHomePage,
  getcrud: getcrud,
  postcrud: postcrud,
  showTableUsers: showTableUsers,
  editcrud: editcrud,
  putcrud: putcrud,
  deletecrud: deletecrud,
};
