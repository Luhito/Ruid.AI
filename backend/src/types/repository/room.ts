import type { UUID } from "../uuid.js";

export type Room = {
    userId: UUID;
    prompt: string;
    answerType: string;
    title: string;
}