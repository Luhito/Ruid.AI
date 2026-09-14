import { AppError } from "./appError.js";

export class NotFoundError extends AppError {
    constructor(resource: string) {
        super(`No search results were found. resource: ${resource}`)
    }
}