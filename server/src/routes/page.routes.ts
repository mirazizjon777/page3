import express from "express";
import { getPages, pageAll, } from "../controller/page.controller";

const router = express.Router();

router.get("/", pageAll);
router.get("/:id", getPages);

export default router;
