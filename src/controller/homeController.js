import userService from '../service/userService';
const handleHelloWorld = (req, res) => {
    //const name = "Eric";
    return res.render("home.ejs",);
}
const handleUserPage = (req, res) => {
    //const name = "Eric";
    return res.render("user.ejs");
}
/*const handleCreateNewUser = async (req, res) => {
    try {
        let { email, password, username } = req.body;
        await userService.CreateNewUser(email, password, username);
        return res.send("Thêm user thành công!");
    } catch (err) {
        console.error(err);
        return res.status(500).send("Lỗi khi thêm user vào database");
    }
};*/

const handleCreateNewUser = async (req, res) => {
    try {
        await userService.getUserList();
        return res.send("Hiện thị user thành công!");
    } catch (err) {
        console.error(err);
        return res.status(500).send("Lỗi hiện thị user từ database");
    }
};


module.exports = {
    handleHelloWorld,
    handleUserPage, handleCreateNewUser
}