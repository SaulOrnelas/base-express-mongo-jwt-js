import { Router } from "express";
import { executeSeeder } from "../seeders/index.js";

const router = Router()

router.get("/execute-seeder", executeSeeder);

export default router;