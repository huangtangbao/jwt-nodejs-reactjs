const handleHelloWorld = (req, res) => {
    //const name = "Eric";
    return res.render("home.ejs",);
}
const handleUserPage = (req, res) => {
    //const name = "Eric";
    return res.render("user.ejs");
}


module.exports = {
    handleHelloWorld,
    handleUserPage
}