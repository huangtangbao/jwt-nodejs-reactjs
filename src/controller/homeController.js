import userService from '../service/userService';
const handleHelloWorld = (req, res) => {
    //const name = "Eric";
    return res.render("home.ejs",);
}
const handleUserPage = async (req, res) => {
    try {
        let userlist = await userService.getUserList();
        return res.render("user.ejs", { userlist });
    } catch (err) {
        console.error(err);
        return res.status(500).send("Lỗi hiện thị user từ database");
    }
}
const handleDeleteUser = async (req, res) => {
    try {
        let userId = req.params.id;
        await userService.deleteUsers(userId);
        return res.json({ success: true });
    } catch (err) {
        console.error("Lỗi khi xóa user:", err);
        return res.status(500).json({ success: false, message: "Lỗi xóa user" });
    }
};
const handleCreateNewUser = async (req, res) => {
    try {
        let { email, password, username } = req.body;
        await userService.CreateNewUser(email, password, username);
        return res.redirect("/users");
    } catch (err) {
        console.error(err);
        return res.status(500).send("Lỗi khi thêm user vào database");
    }
};

const handleUpdateUserPage = async (req, res) => {
    try {
        const { id } = req.params; // Lấy ID người dùng từ URL
        const user = await userService.getUserById(id); // Lấy thông tin người dùng từ DB

        if (user) {
            console.log("gia tri user: ", { user });
            return res.render("updateuser.ejs", { user }); // Truyền dữ liệu người dùng vào trang updateuser.ejs
        } else {
            return res.status(404).send("User not found");
        }
    } catch (err) {
        console.error("Error fetching user:", err);
        return res.status(500).send("Server error");
    }
};
const handleUpdateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, username } = req.body; // Lấy thông tin người dùng từ form

        const result = await userService.updateUser(id, email, username); // Cập nhật vào DB

        if (result.affectedRows > 0) {
            return res.redirect("/users");
        } else {
            return res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (err) {
        console.error("Error updating user:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};




module.exports = {
    handleHelloWorld,
    handleUserPage, handleCreateNewUser,
    handleDeleteUser,
    handleUpdateUserPage,
    handleUpdateUser
}