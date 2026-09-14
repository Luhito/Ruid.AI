import { AppError } from "./appError.js";

export class UuidValidationError extends AppError {
    constructor(wrongUuid: unknown) {
        super(`UUID is not valid. UUID:${wrongUuid}`)
    }
}