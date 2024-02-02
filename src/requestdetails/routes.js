const { Router } = require('express')
const controller = require('./controller')

const router = Router();

router.get("/", controller.getRequestDetails)
router.get("/:id", controller.getRequestDetailById)

router.post("/", controller.addRequestDetail)

router.patch("/:id", controller.updateRequestDetail)

router.delete("/:id", controller.removeRequestDetail)

module.exports = router;