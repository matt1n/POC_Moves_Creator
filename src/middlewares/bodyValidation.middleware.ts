import { Request, Response, NextFunction } from "express"
import { ObjectSchema } from "joi"
import { Move } from "../protocols/Move"

export function bodyValidate(schema: ObjectSchema<Move>){
    return (req: Request, res: Response, next: NextFunction) => {
        const body = req.body as Move
        const validation = schema.validate(body, {abortEarly: false})
        if (validation.error) {
            const errors = validation.error.details.map(detail => detail.message)
            return res.status(422).send({message: errors})
        }
        req.body = validation.value
        next()
    }
}