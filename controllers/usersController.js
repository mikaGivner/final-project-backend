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

// export const getPlay = async (req, res) => {
//   try {
//     const play = await importUsers.findOne({ gamePin: req.params.gamePin });
//     if (!play) {
//       throw new Error(`The pin not found`);
//     }
//     res.status(200).json({
//       success: true,
//       data: play,
//     });
//   } catch (err) {
//     res.status(400).json({
//       success: false,
//       error: err.message,
//     });
//     console.log("error:", err);
//   }
// };

// export const updatePlay = async (req, res) => {
//   const play = await importUsers.findOne({ gamePin: req.params.gamePin });
//   if (!play) {
//     res.status(404);
//     throw new Error("play is not found");
//   }
//   const updatedPlay = await importUsers.findOneAndUpdate(
//     { gamePin: req.params.gamePin },
//     req.body,
//     {
//       new: true,
//     }
//   );
//   res.status(200).json(updatedPlay);
// };
