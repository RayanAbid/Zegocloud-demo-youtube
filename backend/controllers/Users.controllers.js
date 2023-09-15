import User from "../models/User.model.js";

import { generateToken } from "../middlewares/Token.js";
import bcrypt from "bcrypt";

const signUp = async (req, res) => {
  const { number, password, name } = req.body;

  console.log(req.body);

  try {
    let user = await User.findOne({
      number: number,
    });

    if (user) {
      res.status(200).json({
        success: false,
        message: "Number already exists!",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      let newUser = new User({
        name: name,
        number: number,
        password: hashedPassword,
      });
      // Testi@gmsizzle.com
      newUser = await newUser.save();

      let expiredAt = new Date();

      expiredAt.setSeconds(expiredAt.getSeconds() + 86400);

      const access_token = generateToken(newUser._id);

      res.status(200).send({
        success: true,

        access_token: access_token,

        user: newUser,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      error: "Failed to sign up!",
    });
  }
};

const login = async (req, res) => {
  try {
    const { number, password } = req.body;
    console.log("tets");
    let user = await User.findOne({
      number: number,
    });

    if (user) {
      const compare = await bcrypt.compare(password, user.password);

      if (compare === true) {
        let expiredAt = new Date();

        expiredAt.setSeconds(expiredAt.getSeconds() + 86400);

        const access_token = generateToken(user._id);

        res.status(200).send({
          success: true,
          access_token: access_token,
          user: user,
        });
      } else {
        res.status(200).json({
          success: false,
          error: {
            passwordError: "Invalid password",
          },
        });
      }
    } else {
      res.status(200).json({
        success: false,
        error: {
          numberError: "User not found",
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: {
        serverError: "Failed to Login!",
      },
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({
      _id: {
        $ne: req.user._id,
      },
    });
    res.status(200).json({
      success: true,
      users: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: {
        serverError: "Failed to get all users!",
      },
    });
  }
};

export { signUp, login, getAllUsers };
