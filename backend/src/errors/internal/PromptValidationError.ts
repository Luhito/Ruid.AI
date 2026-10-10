import { AppError } from "./appError.js";

export class PromptValidationError extends AppError {
    constructor(wrongPrompt: unknown) {
        super(`Prompt is not valid. Prompt:${wrongPrompt}`)
    }
}