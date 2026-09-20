import type { UUID } from "crypto";

/** RepoQuestion型 */
export interface RepoQuestion {
    room_id: UUID;
    questionText: string;
    explanationText: string;
}