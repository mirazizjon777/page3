import express from "express";
import { getPages, getTest, pageAll } from "../controller/page.controller";

const router = express.Router();

router.get("/test", getTest);

router.get("/", pageAll);
router.get("/:id", getPages);

export default router;
