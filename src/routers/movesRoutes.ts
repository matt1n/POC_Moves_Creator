import { Router } from "express";
import { addMove, deleteMove, getMove, getMoveByCategory, updateMove } from "../controllers/moves.controllers.js";
import { bodyValidate } from "../middlewares/bodyValidation.middleware.js";
import { categoryValidate, idValidate } from "../middlewares/moves.middleware.js";
import { MoveSchema } from "../models/move.schema.js";

const movesRoutes = Router()

movesRoutes
.post("/move", bodyValidate(MoveSchema), addMove)
.get("/moves", getMove)
.get("/moves/:category", categoryValidate, getMoveByCategory)
.put("/move/:id", idValidate, bodyValidate(MoveSchema), updateMove)
.delete("/move/:id", idValidate, bodyValidate(MoveSchema), deleteMove)

export {movesRoutes}