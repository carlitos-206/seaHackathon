const { Router } = require("express");
const router = Router();

router.use("/users", require("./users"))
router.use("/", (req, res) => res.status(404).send({Error: 'ROUTE NOT VALID'}))

module.exports = router;