import mysql from 'mysql2/promise'; // Sử dụng mysql2 với promise
import bcrypt from 'bcryptjs';
import db from '../models/index';
// Tạo connection pool thay vì dùng createConnection
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'jwt',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
const saltRounds = 10;
const hashedUserPassword = async (userhashPassword) => {
    try {
        // Hash password trước khi lưu vào DB
        let hashedPassword = await bcrypt.hash(userhashPassword, saltRounds);
        return hashedPassword; // Trả về giá trị hash để dùng trong CreateNewUser
    } catch (error) {
        console.error("Lỗi khi hash password:", error);
        throw error;
    }
};
const CreateNewUser = async (email, password, username) => {
    try {
        let hashPass = await hashedUserPassword(password); // Chờ hash hoàn thành
        /*console.log("hashPassword:", hashPass);

        const sql = 'INSERT INTO users (email, password, username) VALUES (?, ?, ?)';
        const [result] = await pool.execute(sql, [email, hashPass, username]);

        console.log("User đã được thêm:", result);
        return result;*/
        await db.User.create({
            email: email,
            username: username,
            password: hashPass

        });
    } catch (error) {
        console.error("Lỗi khi tạo user:", error);
        throw error;
    }
};

const getUserList = async () => {
    try {
        const [results] = await pool.execute('SELECT * FROM users');
        console.log(results);
        return results; // Trả về danh sách user
    } catch (error) {
        console.error("Lỗi hiện thị user:", error);
        throw error;
    }
};
const deleteUsers = async (id) => {
    try {
        const sql = "DELETE FROM users WHERE id=?";
        const [results] = await pool.execute(sql, [id]);
        return results;
    } catch (error) {
        console.error("Lỗi khi xóa user:", error);
        throw error;
    }
};
const getUserById = async (id) => {
    try {
        const sql = 'SELECT * FROM users WHERE id = ?';
        const [results] = await pool.execute(sql, [id]);

        if (results.length > 0) {
            return results[0]; // Trả về thông tin người dùng
        } else {
            return null; // Không tìm thấy người dùng
        }
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw error;
    }
};
const updateUser = async (id, email, username) => {
    try {
        const sql = 'UPDATE users SET email = ?, username = ? WHERE id = ?';
        const params = [email, username, id];
        const [result] = await pool.execute(sql, params);
        return result;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};
module.exports = {
    CreateNewUser,
    getUserList,
    deleteUsers,
    getUserById,
    updateUser
}