import { NextFunction, Request, Response } from "express";
import { selectMovesByCategory, selectMovesById } from "../repositories/moves.repositories.js";

export async function idValidate(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id as string
    const move = await selectMovesById(id)
    if (move.rows.length===0){
        return res.sendStatus(404)
    }
    next()
}

export async function categoryValidate(req: Request, res: Response, next: NextFunction){
    const category = req.params.category as string
    const move = await selectMovesByCategory(category)
    if (move.rows.length===0){
        return res.sendStatus(404)
    }
    next()
}