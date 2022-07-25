const UserService = require("../services/userService");
const { Jwt } = require("../apps/jwt");

exports.Login = async (req, res) => {
  var authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send("You are not authorized.");
  }

  var auth = new Buffer(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":");
  var email = auth[0];
  var password = auth[1];

  const user = await UserService.getUserByEmail(email.toLowerCase());

  if (!user) {
    return res.status(401).send(`No user with this email found`);
  } else {
    if (password == user.password) {
      const loginToken = new Jwt().createToken(
        { email: user.email, user_id: user.user_id },
        { expiresIn: "24h" }
      );

      await user.update({ login_token: loginToken });

      const message = {
        email: user.email,
        login_token: loginToken,
        user_id: user.user_id,
        user_name: user.name,
        group_name: user.groups.group_name,
      };

      return res.status(200).send(message);
    } else {
      return res.status(401).send(`password doesn't matches our records`);
    }
  }
};

exports.getPlayers = async (req, res) => {
  try {
    const data = await UserService.getPlayers();
    return res.send({ data });
  } catch (e) {
    console.log(e);
  }
};

exports.getMaps = async (req, res) => {
  try {
    const map_data = await UserService.getMaps();
    return res.send({ map_data });
  } catch (e) {
    console.log(e);
  }
};
