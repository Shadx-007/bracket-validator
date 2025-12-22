import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import User from "@/models/user";
import connectToDatabase from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    // 🔍 Read body
    const body = await request.json();
    console.log("SIGNUP BODY 👉", body);

    const { name, email, password, confirmPassword } = body;
    console.log("FIELDS 👉", { name, email, password, confirmPassword });

    // ❌ Missing fields
    if (!name || !email || !password || !confirmPassword) {
      console.log("❌ FAILED: missing fields");
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // ❌ Invalid email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("❌ FAILED: invalid email");
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    // ❌ Password mismatch
    if (password !== confirmPassword) {
      console.log("❌ FAILED: password mismatch");
      return NextResponse.json(
        { message: "Passwords do not match" },
        { status: 400 }
      );
    }

    // ❌ Weak password
    if (password.length < 6) {
      console.log("❌ FAILED: password too short");
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // 🔗 Connect DB
    await connectToDatabase();

    // 🔍 Check existing user
    const existingUser = await User.findOne({ email });
    console.log("EXISTING USER 👉", existingUser);

    if (existingUser) {
      console.log("❌ FAILED: user already exists");
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create user
    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log("✅ USER CREATED SUCCESSFULLY");

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("🔥 SIGNUP ERROR:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
