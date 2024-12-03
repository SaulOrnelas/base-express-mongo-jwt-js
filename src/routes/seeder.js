const { Router } = require('express');
const { executeSeeder } = require('../seeders/index');

const router = Router()

router.get("/execute-seeder", executeSeeder);

module.exports = router