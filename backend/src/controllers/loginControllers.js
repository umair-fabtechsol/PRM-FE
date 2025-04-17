import userModel from "../models/userModel";

//this is for add user
export const adduser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new userModel({
      email: email,
      password: password,
    });
    const savedUser = await user.save();
    res.status(201).json({ msg: "User Created Successfully", savedUser });
  } catch (err) {
    res.status(500).json({ msg: "Server Error", err });
  }
};

export const testingGet = async (req, res) => {
  res.send("running server");
};
