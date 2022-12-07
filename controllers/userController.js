const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    adam = await User.findOne({ username });
    if (!adam) {
      return res.json({ msg: "Username is not exist", status: false });
    }
    const isPasswordValid = await bcrypt.compare(password, adam.password);
    if (!isPasswordValid) {
      return res.json({ msg: "Incorrect Username or Password", status: false });
    }
    delete adam.password;
    return res.json({ status: true, adam });
  } catch (err) {
    next(ex);
  }
};

module.exports.getallusers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.json(users);
  } catch (err) {
    next(err)
  }
}

module.exports.getsingleuser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.json({msg: "user is not exist", status: false})
    }
    return res.json({status: true, user})
  } catch (err) {
    next(err)
  }
}
