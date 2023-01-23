import joi from "joi"
import { Move } from "../protocols/Move"

export const MoveSchema: joi.ObjectSchema<Move> = joi.object({
    name: joi.string().required(),
    description: joi.string().required(),
    category: joi.string().required().valid("status", "physical", "special").case("lower"),
    power: joi.number().allow(null, ""),
    accuracy: joi.number().min(0).max(100).precision(2),
    type: joi.string().required().case("upper"),
    pp: joi.number().min(1).max(99).precision(2).required(),
    trainer_name: joi.string().required()
})