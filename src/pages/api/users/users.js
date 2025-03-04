import dbConnect from "@/db/connect";
import User from "@/db/models/User";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const userData = req.body;
      const user = new User(userData);
      await user.save();
      console.log(user);
      return res.status(200).json({ status: "user created!" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  if (req.method === "GET") {
    try {
      const users = await User.find({}).exec();
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
