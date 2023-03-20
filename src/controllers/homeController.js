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
  return res.render("crud.ejs");
};

//[POST] /post-crud
let postcrud = async (req, res) => {
  await CRUDService.createNewUser(req.body);
  return res.render("homepage.ejs");
};

module.exports = {
  getHomePage: getHomePage,
  getcrud: getcrud,
  postcrud: postcrud,
};
