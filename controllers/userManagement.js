"use strict";

const Users = require("../models/index").Users;
const Userservice = require("../services/userService");

// const userManagementController = {
//   async login(req, res) {
//     const { email, password } = req.body;

//     const response = await Userservice.login(email.toLowerCase(), password);

//     switch (response) {
//       case "success":
//         return res
//           .status(200)
//           .send(`you have succesfully logged in with ${email}`);

//       case "notFound":
//         return res.status(401).send(`No user with this email found`);
//       case "doesnt match":
//         return res.status(401).send(`password doesn't matches our records`);
//     }
//   },
// };

exports.Login = async (req, res, next) => {
  var authHeader = req.headers.authorization;
  if (!authHeader) {
    var err = new Error("You are not authorized.");
    return unauthorizedResponse(req, res, err.message);
  }

  var auth = new Buffer(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":");
  var email = auth[0];
  var password = auth[1];

  const user = await UserService.getUserByEmail(email.toLowerCase());

  if (!user) {
    const err = new Error("No user with that email found.");
    return unauthorizedResponse(req, res, err.message);
  } else {
    bcrypt.compare(password, user.password, async (error, isMatch) => {
      if (error) {
        const err = new Error("passwords do not match.");
        return unauthorizedResponse(req, res, err.message);
      } else if (isMatch) {
        const loginToken = new Jwt().createToken(
          { email: user.email, user_id: user.user_id },
          { expiresIn: "24h" }
        );

        await user.update({ login_token: loginToken, loginAt: new Date() });

        const message = {
          email: user.email,
          login_token: loginToken,
          user_id: user.user_id,
          user_name: user.name,
          group_name: user.groups.group_name,
        };

        return okResponse(req, res, message);
      } else {
        const err = new Error("passwords do not match.");
        return unauthorizedResponse(req, res, err.message);
      }
    });
  }
};

// module.exports = userManagementController;
