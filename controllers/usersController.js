import importUsers from "../modules/users.js";

export const getUsers = async (req, res) => {
  try {
    const users = await importUsers.find();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
    console.log("error:", err);
  }
};

export const createUser = async (req, res) => {
  try {
    console.log(req.body);
    const user = await importUsers.create(req.body);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
    console.log("error:", err);
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await importUsers.findOne({ userName: req.params.userName });
    if (!user) {
      throw new Error(`The user not found`);
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
    console.log("error:", err);
  }
};
