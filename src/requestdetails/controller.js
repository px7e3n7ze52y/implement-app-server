const pool = require("../../db");
const queries = require("./queries");

const getRequestDetails = (req, res) => {
  pool.query(queries.getRequestDetails, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getRequestDetailById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getRequestDetailById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addRequestDetail = (req, res) => {
  const { request_id, plan_id } = req.body;

  pool.query(
    queries.addRequestDetail,
    [request_id, plan_id],
    (error, results) => {
      if (error) {
        let messageError = {
          statusCode: error.statusCode || 400,
          message: error.message || error,
        };
        res.status(messageError.statusCode);
        res.json(messageError);
      } else res.status(201).send("RequestDetail Created Successfully!");
    }
  );
};

const updateRequestDetail = (req, res) => {
  const id = parseInt(req.params.id);
  const { request_id, plan_id } = req.body;

  pool.query(queries.getRequestDetailById, [id], (error, results) => {
    const noRequestDetailFound = !results.rows.length;
    if (noRequestDetailFound) {
      return res.status(400).send("RequestDetail doesn't exist in database");
    }

    pool.query(
      queries.updateRequestDetail,
      [request_id, plan_id, id],
      (error, results) => {
        if (error) {
          let messageError = {
            statusCode: error.statusCode || 400,
            message: error.message || error,
          };
          res.status(messageError.statusCode);
          res.json(messageError);
        } else res.status(200).send("RequestDetail updated Successfully!");
      }
    );
  });
};

const removeRequestDetail = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getRequestDetailById, [id], (error, results) => {
    const noRequestDetailFound = !results.rows.length;
    if (noRequestDetailFound) {
      return res.status(400).send("RequestDetail doesn't exist in database");
    }

    pool.query(queries.removeRequestDetail, [id], (error, results) => {
      if (error) {
        let messageError = {
          statusCode: error.statusCode || 400,
          message: error.message || error,
        };
        res.status(messageError.statusCode);
        res.json(messageError);
      } else res.status(200).send("RequestDetail removed Successfully!");
    });
  });
};

module.exports = {
  getRequestDetails,
  getRequestDetailById,
  addRequestDetail,
  updateRequestDetail,
  removeRequestDetail,
};
