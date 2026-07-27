"use server";
import { db } from "@/lib/db";
import { Staff } from "@/types/staff";
import { revalidatePath } from "next/cache";
export async function createStaff(formData: FormData) {
  const name = formData.get("name");

  const email = formData.get("email");

  const age = formData.get("age");

  const avatar = formData.get("avatar");

  await db.query(
    "INSERT INTO staff (name, email, age, avatar) VALUES (?, ?, ?, ?)",
    [name, email, age, avatar],
  );
  revalidatePath("/");
}

export async function updateStaff(id: number, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const age = Number(formData.get("age"));

  await db.query("UPDATE staff SET name = ?, email = ?, age = ? WHERE id = ?", [
    name,
    email,
    age,
    id,
  ]);

  revalidatePath("/");
}

export async function deleteStaff(id: number) {
  await db.query("DELETE FROM staff WHERE  id = ?", [id]);
  revalidatePath("/");
}

export async function getStaffList(): Promise<Staff[]> {
  const [rows] = await db.query("SELECT * FROM staff", []);
  return rows as Staff[];
}
