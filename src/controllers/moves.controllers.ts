import { Request, Response } from "express";
import { Move } from "../protocols/Move.js";
import { categoryValidate, deleteIdValidate, getAllMoves, insertMoveService, putIdValidate } from "../services/moves-services/index.js";



async function addMove(req: Request,res: Response) {
    const body = req.body as Move
    try {
        await insertMoveService(body)
        res.sendStatus(201)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

async function getMove(req: Request,res: Response) {
    try {
        const moves = await getAllMoves()
        res.send(moves.rows)
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
}

async function getMoveByCategory(req: Request, res:Response) {
    const category = req.params.category as string
    try {
        const moves = await categoryValidate(category)
        res.send(moves.rows)
    } catch (error) {
        if (error.type === "error_not_found") {
			return res.status(404).send(error.message);
		}
        res.sendStatus(500)
    }
}

async function updateMove(req: Request, res: Response) {
    const id = req.params.id as string
    const body = req.body as Move
    try {
        await putIdValidate(body, id)
        res.sendStatus(200)
    } catch (error) {
        if (error.type === "error_not_found") {
			return res.status(404).send(error.message);
		}
        res.sendStatus(500)
    }
}

async function deleteMove(req: Request, res: Response) {
    const id = req.params.id as string
    try {
        await deleteIdValidate(id)
        res.sendStatus(200)
    } catch (error) {
        if (error.type === "error_not_found") {
			return res.status(404).send(error.message);
		}
        res.sendStatus(500)
    }
}  

export {addMove,getMove, updateMove,deleteMove,getMoveByCategory}