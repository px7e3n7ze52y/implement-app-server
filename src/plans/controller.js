const pool = require("../../db");
const queries = require("./queries");

const getPlans = (req, res) => {
  pool.query(queries.getPlans, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getPlanById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getPlanById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addPlan = (req, res) => {
  const { plan_name, description, image, price } = req.body;
  const create_at = new Date();
  const update_at = new Date();

  pool.query(
    queries.addPlan,
    [plan_name, description, image, price, create_at, update_at],
    (error, results) => {
      if (error) {
        let messageError = {
          statusCode: error.statusCode || 400,
          message: error.message || error,
        };
        res.status(messageError.statusCode);
        res.json(messageError);
      } else res.status(201).send("Plan Created Successfully!");
    }
  );
};

const updatePlan = (req, res) => {
  const id = parseInt(req.params.id);
  const { plan_name, description, image, price } = req.body;
  const update_at = new Date();

  pool.query(queries.getPlanById, [id], (error, results) => {
    const noPlanFound = !results.rows.length;
    if (noPlanFound) {
      return res.status(400).send("Plan doesn't exist in database");
    }

    pool.query(
      queries.updatePlan,
      [plan_name, description, image, price, update_at, id],
      (error, results) => {
        if (error) {
          let messageError = {
            statusCode: error.statusCode || 400,
            message: error.message || error,
          };
          res.status(messageError.statusCode);
          res.json(messageError);
        } else res.status(200).send("Plan updated Successfully!");
      }
    );
  });
};

const removePlan = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getPlanById, [id], (error, results) => {
    const noPlanFound = !results.rows.length;
    if (noPlanFound) {
      return res.status(400).send("Plan doesn't exist in database");
    }

    pool.query(queries.removePlan, [id], (error, results) => {
      if (error) {
        let messageError = {
          statusCode: error.statusCode || 400,
          message: error.message || error,
        };
        res.status(messageError.statusCode);
        res.json(messageError);
      } else res.status(200).send("Plan removed Successfully!");
    });
  });
};

module.exports = {
  getPlans,
  getPlanById,
  addPlan,
  updatePlan,
  removePlan,
};
