import { Router } from "express";
import { addMove, deleteMove, getMove, getMoveByCategory, updateMove } from "../controllers/moves.controllers.js";
import { bodyValidate } from "../middlewares/bodyValidation.middleware.js";
import { MoveSchema } from "../models/move.schema.js";

const movesRoutes = Router()

movesRoutes
.post("/move", bodyValidate(MoveSchema), addMove)
.get("/moves", getMove)
.get("/moves/:category", getMoveByCategory)
.put("/move/:id", bodyValidate(MoveSchema), updateMove)
.delete("/move/:id", deleteMove)

export {movesRoutes}