const pool = require("../../db");
const queries = require("./queries");

const getRequests = (req, res) => {
  pool.query(queries.getRequests, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getRequestById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getRequestById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addRequest = (req, res) => {
  const { status } = req.body;
  const create_at = new Date();

  pool.query(
    queries.addRequest,
    [status, create_at],
    (error, results) => {
      if (error) {
        let messageError = {
          statusCode: error.statusCode || 400,
          message: error.message || error,
        };
        res.status(messageError.statusCode);
        res.json(messageError);
      } else res.status(201).send("Request Created Successfully!");
    }
  );
};

const updateRequest = (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;

  pool.query(queries.getRequestById, [id], (error, results) => {
    const noRequestFound = !results.rows.length;
    if (noRequestFound) {
      return res.status(400).send("Request doesn't exist in database");
    }

    pool.query(
      queries.updateRequest,
      [status, id],
      (error, results) => {
        if (error) {
          let messageError = {
            statusCode: error.statusCode || 400,
            message: error.message || error,
          };
          res.status(messageError.statusCode);
          res.json(messageError);
        } else res.status(200).send("Request updated Successfully!");
      }
    );
  });
};

const removeRequest = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getRequestById, [id], (error, results) => {
    const noRequestFound = !results.rows.length;
    if (noRequestFound) {
      return res.status(400).send("Request doesn't exist in database");
    }

    pool.query(queries.removeRequest, [id], (error, results) => {
      if (error) {
        let messageError = {
          statusCode: error.statusCode || 400,
          message: error.message || error,
        };
        res.status(messageError.statusCode);
        res.json(messageError);
      } else res.status(200).send("Request removed Successfully!");
    });
  });
};

module.exports = {
  getRequests,
  getRequestById,
  addRequest,
  updateRequest,
  removeRequest,
};
