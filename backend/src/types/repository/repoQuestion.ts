import type { UUID } from "../uuid.js";

/** RepoQuestion型 */
export interface RepoQuestion {
    createUserId: UUID;
    roomId: UUID;
    questionText: string;
    explanationText: string;
    answeredFlg: boolean;
    summary: string;
}