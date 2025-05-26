export async function handleRoleChange(userId: number, newRole: string) {
    try {
      const res = await fetch(`/api/users/${userId}/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }), // Sending the new role
      });
  
      if (res.ok) {
        // Optionally, you can return the updated user or status
        const updatedUser = await res.json();
        return updatedUser;
      } else {
        alert("Failed to update role");
      }
    } catch (err) {
      console.error("Error updating role:", err);
      alert("Something went wrong");
    }
  }
  