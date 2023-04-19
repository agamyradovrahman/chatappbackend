const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const sendToken = require("../utils/jwtToken");
const cloudinary = require("../cloud/cloud");

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

    const token = user.getJwtToken();

    delete user.password;
    return res.json({ status: true, user, token });
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};

      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });

      return res.status(400).send(errors);
    }

    res.status(500).send("Something went wrong");
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    adam = await User.findOne({ username });
    if (!adam) {
      return res.json({ msg: "Username is not exist", status: false });
    }
    const isPasswordValid = await adam.comparePassword(password);
    if (!isPasswordValid) {
      return res.json({ msg: "Incorrect Username or Password", status: false });
    }
    delete adam.password;

    sendToken(adam, 201, res);
  } catch (err) {
    next(err);
  }
};

module.exports.getallusers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.json(users);
  } catch (err) {
    next(err);
  }
};

module.exports.getsingleuser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.json({ msg: "user is not exist", status: false });
    }
    return res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

module.exports.singleuser = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.json({ msg: "user is not exist", status: false });
    }
    return res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

module.exports.logoutUser = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    const sagat = new Date(Date.now());
    console.log(sagat);

    res.status(200).json({
      success: true,
      message: "Log out success",
    });
  } catch (error) {
    next(error);
  }
};

module.exports.Rename = async (req, res, next) => {
  try {
    const { userid, newusername } = req.body;

    const userr = await User.findOne({ username: newusername });

    if (userr) {
      return res.json({
        msg: "user is exist with that username",
        status: false,
      });
    }

    const user = await User.findByIdAndUpdate(
      userid,
      { username: newusername },
      {
        new: true,
        runValidator: true,
        useFindAndModify: false,
      }
    );

    res.json({ user, status: true });
  } catch (error) {
    next(error);
  }
};

module.exports.Uploadavatar = async (req, res, next) => {
  try {
    const { userid, url } = req.body;

    const user1 = await User.findById(userid)
    
    if (!user1) {
      return res.json({msg: "user is not exist", status: false})
    }

    const user = await User.findByIdAndUpdate(
      userid,
      { avatar:  url  },
      {
        new: true,
        runValidator: true,
        useFindAndModify: false,
      }
    );

    return res.json({ user, status: true });
  } catch (error) {
    next(error);
  }
};
