"use client";

import { deleteUser } from "@/actions/user";

export function DeleteServer({ id }: { id: number }) {
  return <button onClick={() => deleteUser(id)}>delete</button>;
}
