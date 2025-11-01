import { Router } from "express";
import { createLead, getAllBikes } from "../controllers/bike.controller.js";

const router = Router();

router.route("/allbikes").get(getAllBikes)
router.route("/lead").post(createLead)

export default router

