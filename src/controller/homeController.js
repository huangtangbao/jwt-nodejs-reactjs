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

/*const handleCreateNewUser = async (req, res) => {
    try {
        await userService.getUserList();
        return res.send("Hiện thị user thành công!");
    } catch (err) {
        console.error(err);
        return res.status(500).send("Lỗi hiện thị user từ database");
    }
};*/


module.exports = {
    handleHelloWorld,
    handleUserPage, handleCreateNewUser,
    handleDeleteUser
}