"use server";
import z from "zod";
import { loginSchema, userSchema } from "./schemas";

export async function loginUser(
  unsafeData: unknown
): Promise<
  | { error: true; message: string }
  | { error: false; data: z.infer<typeof userSchema> }
> {
  if (!loginSchema.safeParse(unsafeData).success) {
    return { error: true, message: "Please correct your inputs and try again" };
  }

  try {
    const res = await fetch("https://randomuser.me/api/?results=1&nat=us");
    if (!res.ok) {
      return { error: true, message: "There was an error logging you in" };
    }
    const fetchedData = await res.json();

    const parsed = userSchema.safeParse(fetchedData);

    if (!parsed.success) {
      return { error: true, message: "There was an error logging you in" };
    }

    return { error: false, data: parsed.data };
  } catch {
    return {
      error: true,
      message: "Network error. Please check your connection and try again.",
    };
  }
}
