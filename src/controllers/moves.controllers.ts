import { Request, Response } from "express";
import { Move } from "../protocols/Move.js";
import { deleteMoveById, insertMove, selectAllMoves, selectMovesByCategory, updateMoveById } from "../repositories/moves.repositories.js";



async function addMove(req: Request,res: Response) {
    const body = req.body as Move
    try {
        await insertMove(body)
        res.sendStatus(201)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

async function getMove(req: Request,res: Response) {
    try {
        const moves = await selectAllMoves()
        res.send(moves.rows)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

async function getMoveByCategory(req: Request, res:Response) {
    const category = req.params.category as string
    try {
        const moves = await selectMovesByCategory(category)
        res.send(moves.rows)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

async function updateMove(req: Request, res: Response) {
    const id = req.params.id as string
    const body = req.body as Move
    try {
        await updateMoveById(body, id)
        res.sendStatus(200)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

async function deleteMove(req: Request, res: Response) {
    const id = req.params.id as string
    try {
        await deleteMoveById(id)
        res.sendStatus(200)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}  

export {addMove,getMove, updateMove,deleteMove,getMoveByCategory}