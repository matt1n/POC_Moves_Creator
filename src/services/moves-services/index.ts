import { Move } from "../../protocols/Move.js";
import { deleteMoveById, insertMove, selectAllMoves, updateMoveById } from "../../repositories/moves.repositories.js";
import { selectMovesByCategory, selectMovesById } from "../../repositories/moves.repositories.js";

function notFoundError(entity: string) {
	return {
		type: "error_not_found",
		message: `Could not find specified "${entity}"!`
	};
}

export async function putIdValidate(body: Move, id: string) {
    const move = await selectMovesById(id)
    if (move.rows.length===0){
        throw notFoundError('move')
    }
    await updateMoveById(body, id)
}

export async function deleteIdValidate(id: string) {
    const move = await selectMovesById(id)
    if (move.rows.length===0){
        throw notFoundError('move')
    }
    await deleteMoveById(id)
}

export async function categoryValidate(category: string){
    const moves = await selectMovesByCategory(category)
        if (moves.rows.length===0){
        throw notFoundError('moves')
    }
    return moves
}

export async function insertMoveService(body: Move){
    await insertMove(body)
}

export async function getAllMoves(){
    const moves = await selectAllMoves()
    return moves
}