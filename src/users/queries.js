const getUsers = "SELECT * FROM users";

const getUserById = "SELECT * FROM users WHERE id = $1";

const addUser = "INSERT INTO users (email, role) VALUES ($1, $2)"

const updateUser = "UPDATE users SET email = $1, role = $2 WHERE id = $3";

const removeUser = "DELETE FROM users WHERE id = $1";

module.exports = {
    getUsers,
    getUserById,
    addUser,
    updateUser,
    removeUser
}