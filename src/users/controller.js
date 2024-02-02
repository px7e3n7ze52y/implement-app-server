const pool = require("../../db");
const queries = require("./queries");

const getUsers = (req, res) => {
  pool.query(queries.getUsers, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getUserById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addUser = (req, res) => {
  const { email, role } = req.body;

  pool.query(
    queries.addUser,
    [email, role],
    (error, results) => {
      if (error) {
        let messageError = {
          statusCode: error.statusCode || 400,
          message: error.message || error,
        };
        res.status(messageError.statusCode);
        res.json(messageError);
      } else res.status(201).send("User Created Successfully!");
    }
  );
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { email, role } = req.body;

  pool.query(queries.getUserById, [id], (error, results) => {
    const noUserFound = !results.rows.length;
    if (noUserFound) {
      return res.status(400).send("User doesn't exist in database");
    }

    pool.query(
      queries.updateUser,
      [email, role, id],
      (error, results) => {
        if (error) {
          let messageError = {
            statusCode: error.statusCode || 400,
            message: error.message || error,
          };
          res.status(messageError.statusCode);
          res.json(messageError);
        } else res.status(200).send("User updated Successfully!");
      }
    );
  });
};

const removeUser = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getUserById, [id], (error, results) => {
    const noUserFound = !results.rows.length;
    if (noUserFound) {
      return res.status(400).send("User doesn't exist in database");
    }

    pool.query(queries.removeUser, [id], (error, results) => {
      if (error) {
        let messageError = {
          statusCode: error.statusCode || 400,
          message: error.message || error,
        };
        res.status(messageError.statusCode);
        res.json(messageError);
      } else res.status(200).send("User removed Successfully!");
    });
  });
};

module.exports = {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  removeUser,
};
