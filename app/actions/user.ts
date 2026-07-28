"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
export async function createUser(prevState: any, formData: FormData) {
  const user_name = formData.get("user_name") as string;
  const password = formData.get("password") as string;
  const isAdmin = formData.get("isAdmin") === "on"; // checkbox trả "on" hoặc null

  if (!user_name || !password) {
    return { error: "Vui lòng nhập đầy đủ thông tin" };
  }

  try {
    const [rows]: any = await db.query(
      "SELECT user_name FROM user WHERE user_name = ?",
      [user_name],
    );

    if (rows.length > 0) {
      return { error: "User đã tồn tại" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO user (user_name, password, is_admin) VALUES (?, ?, ?)",
      [user_name, hashedPassword, isAdmin],
    );

    revalidatePath("/");
    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: "Có lỗi xảy ra, vui lòng thử lại" };
  }
}

type FormState = {
  error?: string;
  success?: boolean;
};

export async function loginUser(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const user_name = formData.get("user_name") as string;
  const password = formData.get("password") as string;

  if (!user_name || !password) {
    return { error: "Vui lòng nhập đầy đủ thông tin" };
  }

  try {
    const [rows]: any = await db.query(
      "SELECT user_name, password, is_admin FROM user WHERE user_name = ?",
      [user_name],
    );

    if (rows.length === 0) {
      return { error: "Sai tên đăng nhập hoặc mật khẩu" };
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return { error: "Sai tên đăng nhập hoặc mật khẩu" };
    }

    // TODO: tạo JWT / session và set cookie httpOnly ở đây
    // const token = jwt.sign({ user_name: user.user_name, isAdmin: user.is_admin }, process.env.JWT_SECRET!);
    // const cookieStore = await cookies();
    // cookieStore.set("token", token, { httpOnly: true, secure: true, path: "/" });
  } catch (err) {
    console.error(err);
    return { error: "Có lỗi xảy ra, vui lòng thử lại" };
  }

  return {
    success: true,
  };
  //   redirect("/dashboard");
}
