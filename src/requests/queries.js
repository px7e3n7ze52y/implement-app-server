const getRequests = "SELECT * FROM requests";

const getRequestById = "SELECT * FROM requests WHERE id = $1";

const addRequest = "INSERT INTO requests (status, create_at) VALUES ($1, $2)"

const updateRequest = "UPDATE requests SET status = $1 WHERE id = $2";

const removeRequest = "DELETE FROM requests WHERE id = $1";

module.exports = {
    getRequests,
    getRequestById,
    addRequest,
    updateRequest,
    removeRequest
}