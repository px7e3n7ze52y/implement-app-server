const { Router } = require('express')
const controller = require('./controller')

const router = Router();

router.get("/", controller.getRequests)
router.get("/:id", controller.getRequestById)

router.post("/", controller.addRequest)

router.patch("/:id", controller.updateRequest)

router.delete("/:id", controller.removeRequest)

module.exports = router;