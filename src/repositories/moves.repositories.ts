import { QueryResult } from "pg";
import connection from "../db/db.js";
import { Move } from "../protocols/Move.js";

export function insertMove(body: Move){
    const {name, description, category, power, accuracy, type, pp, trainer_name} = body
    return connection.query("INSERT INTO moves (name, description, category, power, accuracy, type, pp, trainer_name) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)", [name, description, category, power, accuracy, type, pp, trainer_name])
}

export function selectAllMoves(): Promise<QueryResult<Move>>{
    return connection.query('SELECT * FROM moves')
}

export function selectMovesByCategory(category: string): Promise<QueryResult<Move>> {
    return connection.query('SELECT * FROM moves WHERE category = LOWER($1)', [category])
}

export function updateMoveById(body: Move, id: string): Promise<QueryResult<string[]>> {
    const {name, description, category, power, accuracy, type, pp, trainer_name} = body
    return connection.query(`UPDATE moves 
    SET 
    "name" = $1,
    "description" = $2,
    "category" = $3,
    "power" = $4,
    "accuracy" = $5,
    "type" = $6,
    "pp" = $7,
    "trainer_name" = $8
    WHERE "id" = $9`, [name, description, category, power, accuracy, type, pp, trainer_name, id])
}

export function deleteMoveById(id: string): Promise<QueryResult<string[]>>  {
    return connection.query('DELETE FROM moves WHERE id = $1', [id])
}

export function selectMovesById(id:string): Promise<QueryResult<Move>>{
    return connection.query("SELECT * FROM moves WHERE id = $1", [id])
}