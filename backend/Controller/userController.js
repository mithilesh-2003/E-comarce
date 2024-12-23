import userModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signupUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const oldUser = await userModel.findOne({ email });
    if (oldUser) {
      res.status(400).json({ message: "This user is already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new userModel({
        username,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      res
        .status(200)
        .json({ message: "User registred successfully", user: newUser });
    }
  } catch (error) {
    res.status(500).json({ message: "User not created" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Username or password is wrong" });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = jwt.sign({ id: user._id }, process.env.SECRET, {
          expiresIn: "24h",
        });
        res
          .status(200)
          .json({ message: "user login successfully", token: token , user: user});
      } else {
        res.status(400).json({ message: "Username or password is wrong" });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const userDetails = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // console.log(req.headers.authorization)
    // console.log(process.env.SECRET)
    const decoded = jwt.verify(token, process.env.SECRET);
    // console.log('decoded',decoded)
    const userId = decoded.id;
    // console.log('userid : ' ,userId)
    const user = await userModel.findOne({ _id: userId }).select("-password");
    // console.log(user)

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json({ message: "User found", user: user });
  } catch (error) {
    res.status(500).json({ message: "Unauthorized or invalid token" });
  }
};

export const userUpdate = async (req, res) => {
  const { firstname, lastname, username, email, currentPassword } = req.body;

  try {
    // const password = await bcrypt.compare(password, user.password);

    const user = await userModel.findOne({ email });
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (user && isMatch) {
      const updatedUser = await userModel.findOneAndUpdate(
        { email },
        { firstname, lastname },
        { new: true }
      );
      res.status(200).json({ message: "user updated" });
    } else {
      res.status(500).json({ message: "password is wrong" });
    }
  } catch (error) {
    res.status(500).json({ message: "user not updated" });
  }
};


export const userAddress = async(req,res) => {

  const {firstname ,lastname ,email ,country ,street_address ,city ,state ,zip_code ,phone, userId} = req.body

  const updateData = {
    firstname,
    lastname,
    address: {
      country,
      street_address,
      city,
      state,
      zip_code,
      phone
    }
  }

  try {
    const user = await userModel.findOneAndUpdate({_id: userId}, {$set: updateData}, {new: true})
    res.status(200).json({message: 'User Updated', user: user})
  } catch (error) {
    res.status(500).json({message: 'User not Updated'})
    console.log(error)
  }


}