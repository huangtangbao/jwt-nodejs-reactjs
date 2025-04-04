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

let selectedRowId = null;

// Hàm chọn dòng và load dữ liệu vào ô nhập liệu
function selectRow(userId, email, username) {
    selectedRowId = userId; // Lưu lại ID của dòng được chọn
    console.log("selectedRowId: ", selectedRowId);
    document.getElementById("email-input").value = email; // Điền email vào ô nhập liệu
    document.getElementById("username-input").value = username; // Điền username vào ô nhập liệu
}
// Hàm chỉnh sửa người dùng
async function editUser(userId) {
    const email = document.getElementById("email-input").value; // Lấy giá trị email mới
    const username = document.getElementById("username-input").value; // Lấy giá trị username mới

    if (selectedRowId === null) {
        alert("Vui lòng chọn một dòng trước khi chỉnh sửa.");
        return;
    }

    // Gửi yêu cầu cập nhật lên server
    try {
        let response = await fetch(`/update-user/${userId}`, {
            method: "PUT", // Cập nhật người dùng
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, username }) // Dữ liệu cần cập nhật
        });
        let result = await response.json();

        if (result.success) {
            // Cập nhật giao diện trực tiếp sau khi chỉnh sửa thành công
            document.getElementById(`email-${userId}`).textContent = email;
            document.getElementById(`username-${userId}`).textContent = username;
            alert("Cập nhật thành công!");
        } else {
            alert("Cập nhật thất bại!");
        }
    } catch (error) {
        console.error("Lỗi khi cập nhật người dùng:", error);
        alert("Lỗi khi cập nhật người dùng.");
    }
}