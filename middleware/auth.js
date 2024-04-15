const { getUser } = require("../services/auth");

async function restrictLoggedUser(req, res, next) {
  // console.log(req.cookies);
  const userid = req.cookies?.uid;
  if (!userid) return res.json({ error: "user not found first step" });
  const user = getUser(userid);
  if (!user) return res.json({ error: "user not found second step" });
  req.user = user;
  next();
}

module.exports = {
  restrictLoggedUser,
};
