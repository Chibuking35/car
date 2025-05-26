import { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export function useRoleChange(
  users: User[],
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedUserName, setSelectedUserName] = useState<string>("");
  const [newRole, setNewRole] = useState<string>("");

  function triggerRoleChange(userId: number, userName: string, role: string) {
    setSelectedUserId(userId);
    setSelectedUserName(userName);
    setNewRole(role);
    setIsConfirmOpen(true);
  }

  async function confirmRoleChange() {
    if (selectedUserId === null) return;

    try {
      const res = await fetch(`/api/users/${selectedUserId}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      if (!res.ok) throw new Error("Failed to update role");

      setUsers((prev) =>
        prev.map((user) =>
          user.id === selectedUserId ? { ...user, role: newRole } : user
        )
      );
      setIsConfirmOpen(false);
    } catch (error) {
      alert("Error updating role: " + error);
      setIsConfirmOpen(false);
    }
  }

  function cancelRoleChange() {
    setIsConfirmOpen(false);
  }

  return {
    isConfirmOpen,
    selectedUserName,
    newRole,
    triggerRoleChange,
    confirmRoleChange,
    cancelRoleChange,
  };
}
