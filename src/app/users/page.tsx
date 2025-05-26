"use client";

import { useEffect, useState } from "react";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ConfirmRoleChangeModal from "@/components/ConfirmRoleChangeModal";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function UsersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>loading...</p>;
  }

  if (!session) {
    return null;
  }

  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<"name" | "email">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [userToChangeRole, setUserToChangeRole] = useState<User | null>(null);
  const [newRole, setNewRole] = useState<string>("");

  // Fetch users on mount
  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    }
    fetchUsers();
  }, []);

  // Filtering & sorting
  useEffect(() => {
    let filtered = [...users];

    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      const fieldA = a[sortField].toLowerCase();
      const fieldB = b[sortField].toLowerCase();
      if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
      if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchTerm, users, sortField, sortOrder]);

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Delete user handlers
  function openDeleteModal(user: User) {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  }

  async function confirmDelete() {
    if (!userToDelete) return;

    try {
      const res = await fetch(`/api/users/${userToDelete.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
      } else {
        alert("Failed to delete user");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Something went wrong");
    } finally {
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    }
  }

  // Role change handlers
  function openRoleModal(user: User, selectedRole: string) {
    setUserToChangeRole(user);
    setNewRole(selectedRole);
    setIsRoleModalOpen(true);
  }

  async function confirmRoleChange() {
    if (!userToChangeRole) return;

    try {
      const res = await fetch(`/api/users/${userToChangeRole.id}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) =>
            u.id === userToChangeRole.id ? { ...u, role: newRole } : u
          )
        );
      } else {
        alert("Failed to update role");
      }
    } catch (err) {
      console.error("Error updating role:", err);
      alert("Something went wrong");
    } finally {
      setIsRoleModalOpen(false);
      setUserToChangeRole(null);
      setNewRole("");
    }
  }

  return (
    <div className="p-5 w-full min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Users</h1>

      {/* Search and Sort */}
      <div className="flex gap-4 mb-4 flex-wrap">
        <input
          type="text"
          placeholder="Search users"
          className="p-1 rounded-full w-full sm:w-64 outline-none bg-gray-200 px-3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="bg-gray-200 rounded-full p-1 px-3 outline-none text-sm text-gray-500"
          value={sortField}
          onChange={(e) => setSortField(e.target.value as "name" | "email")}
        >
          <option value="name">Sort by Name</option>
          <option value="email">Sort by Email</option>
        </select>
        <button
          className="border p-1 w-40 rounded-3xl text-sm bg-blue-500 text-white"
          onClick={() =>
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
          }
        >
          {sortOrder === "asc" ? "Ascending" : "Descending"} Order
        </button>
      </div>

      {/* User List */}
      {currentUsers.length === 0 ? (
        <div className="flex justify-center items-center place-content-center">
          <p className="text-center">No users found</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {currentUsers.map((user) => (
            <li
              key={user.id}
              className="even:bg-gray-100 odd:bg-gray-200 p-2 flex justify-between items-center rounded-md"
            >
              <div className="flex-1 text-gray-700">{user.name}</div>
              <div className="flex-1 text-gray-700">{user.email}</div>
              <div className="flex-1">
                <select
                  className=" rounded px-2 py-1 text-sm outline-none"
                  value={user.role}
                  onChange={(e) => openRoleModal(user, e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                  <option value="superadmin" >Super Admin</option>
                  <option value="moderator">Moderator</option>
                </select>
              </div>

              <button
                onClick={() => openDeleteModal(user)}
                className="bg-red-500 text-white px-3 py-1 mr-3 rounded-full text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-full bg-blue-600 text-white transition text-sm ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-200 hover:text-gray-600"
            }`}
          >
            Previous
          </button>

          <span className="px-3 py-1">
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-full bg-blue-600 text-white transition text-sm ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-200 hover:text-gray-600"
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        userName={userToDelete?.name}
      />

      {/* Role Change Confirmation Modal */}
      <ConfirmRoleChangeModal
        isOpen={isRoleModalOpen}
        onCancel={() => setIsRoleModalOpen(false)}
        onConfirm={confirmRoleChange}
        userName={userToChangeRole?.name}
        newRole={newRole}
      />
    </div>
  );
}
