const { Router } = require('express')
const controller = require('./controller')

const router = Router();

router.get("/", controller.getPlans)
router.get("/:id", controller.getPlanById)

router.post("/", controller.addPlan)

router.patch("/:id", controller.updatePlan)

router.delete("/:id", controller.removePlan)

module.exports = router;