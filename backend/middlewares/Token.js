// Token Middleware
import jwt from "jsonwebtoken";
import UserModel from "../models/User.model.js";

const generateToken = (id) => {
  // find user and sign token against user

  const access_token = jwt.sign(
    {
      userID: id,
    },
    "access_token"
    // {
    //   expiresIn: "7d",
    // }
  );

  return access_token;
};

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(403).send({ error: "You must be logged in." });
  }

  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, "access_token", async (err, payload) => {
    if (err) {
      if (err instanceof jwt.TokenExpiredError) {
        return res
          .status(403)
          .send({ message: "Unauthorized! Access Token was expired!" });
      }
      return res.status(403).send({ error: "You must be logged in." });
    }

    const { userID } = payload;
    // console.log("aye yo", userID);

    const user = await UserModel.findById(userID);
    req.user = user;
    next();
  });
};

export { generateToken, verifyToken };
