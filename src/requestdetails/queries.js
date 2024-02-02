const getRequestDetails = "SELECT * FROM requestdetails";

// const getRequestDetails = "SELECT rd.id, rd.request_id, r.status, rd.plan_id, p.plan_name FROM requestdetails rd JOIN plans p ON rd.plan_id = p.id JOIN requests r ON rd.request_id = r.id;";

const getRequestDetailById = "SELECT * FROM requestdetails WHERE id = $1";

const addRequestDetail = "INSERT INTO requestdetails (request_id, plan_id) VALUES ($1, $2)"

const updateRequestDetail = "UPDATE requestdetails SET request_id = $1, plan_id = $2 WHERE id = $3";

const removeRequestDetail = "DELETE FROM requestdetails WHERE id = $1";

module.exports = {
    getRequestDetails,
    getRequestDetailById,
    addRequestDetail,
    updateRequestDetail,
    removeRequestDetail
}