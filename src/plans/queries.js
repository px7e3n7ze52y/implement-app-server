const getPlans = "SELECT * FROM plans";

const getPlanById = "SELECT * FROM plans WHERE id = $1";

const addPlan = "INSERT INTO plans (plan_name, description, image, price, create_at, update_at) VALUES ($1, $2, $3, $4, $5, $6)"

const updatePlan = "UPDATE plans SET plan_name = $1 ,description = $2, image = $3, price = $4, update_at = $5 WHERE id = $6";

const removePlan = "DELETE FROM plans WHERE id = $1";

module.exports = {
    getPlans,
    getPlanById,
    addPlan,
    updatePlan,
    removePlan
}