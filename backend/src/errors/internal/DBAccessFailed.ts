import { AppError } from "./appError.js";

export class DBAccessFailed extends AppError {
    constructor(dbaccesser_name: string, e: unknown) {
        super(`DB Access failed. 
            accesser: ${dbaccesser_name}
            cause: ${e}`)
    }
}