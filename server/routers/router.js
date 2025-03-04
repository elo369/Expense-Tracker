import express, { Router } from "express"
import { createList, deleted, getAll, updated } from "../controllers/controllers.js"

const router = Router()

router.post("/createList",createList)
router.get("/getData",getAll)
router.put("/updateData/:id",updated)
router.delete("/deleted/:id",deleted)

export default router