// app/api/users/route.js
import { adduser } from "../../../controllers/loginControllers";
import { connectDB } from "../../../lib/db";
import userModel from "../../../models/userModel";

export async function POST(req, res) {
  const { email, password } = await req.json();

  console.log("email", email, password);
  await connectDB();

  try {
    const user = new userModel({ email, password });
    await user.save();

    return new Response(
      JSON.stringify({ msg: "User created successfully", user }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Error in POST request:", err);
    return new Response(JSON.stringify({ msg: "Server Error", error: err }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
