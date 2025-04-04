async function deleteUser(userId) {
    if (confirm("Bạn có chắc muốn xóa user này không?")) {
        try {
            let response = await fetch(`/delete-user/${userId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });

            let result = await response.json();
            if (result.success) {
                document.getElementById(`row-${userId}`).remove(); // Xóa dòng khỏi giao diện
            } else {
                alert("Xóa thất bại!");
            }
        } catch (error) {
            console.error("Lỗi khi xóa user:", error);
        }
    }
}
