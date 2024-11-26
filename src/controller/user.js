import UserModel from "../model/user.js";
import validation from "../utils/validation.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SIGN_IN = async (req, res) => {
  try {
    if (validation(req).length > 0) {
      return res
        .status(404)
        .json(`${validation(req)} is missing from your input!`);
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = {
      id: uuidv4(),
      name: req.body.name,
      email: req.body.email,
      password: hash,
    };

    const doesUserExists = await UserModel.findOne({ email: req.body.email });
    if (doesUserExists) {
      return res.status(409).json("Email already in use!");
    }

    const user = new UserModel(newUser);
    const response = await user.save();
    const users = await UserModel.find();
    if (response) {
      return res
        .status(201)
        .json({ message: "User added successfully!", users: users });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json("Something went wrong!");
  }
};

const LOGIN = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json("Bad input data!");
    }
    const isPasswordRight = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordRight) {
      return res.status(401).json("Bad input data!");
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.PASSWORD,
      { expiresIn: "12h" }
    );
    return res
      .status(200)
      .json({ message: "Connected successfully!", token: token });
  } catch (err) {
    console.log(err);
    return res.status(500).json("Something went wrong!");
  }
};

export { SIGN_IN, LOGIN };
