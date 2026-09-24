-- DROP TABLE questions;

CREATE TABLE questions (
    question_id         UUID            NOT NULL,
    create_user_id      UUID            NOT NULL,
    room_id             UUID            NOT NULL,
    question_text       TEXT            NOT NULL,
    explanation_text    TEXT            NOT NULL,
    summary             TEXT            NOT NULL,
    answered_flg        BOOLEAN         NOT NULL DEFAULT FALSE,
    tokenct_all         INTEGER,
    tokenct_in          INTEGER,
    tokenct_out         INTEGER,
    tokenct_thought     INTEGER,
    created_at          TIMESTAMPTZ     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMPTZ     NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT pk_questions
        PRIMARY KEY (question_id),

    CONSTRAINT fk_questions_create_user
        FOREIGN KEY (create_user_id)
        REFERENCES users(user_id)
);

CREATE INDEX idx_questions_room_id_updated_at
ON questions (room_id, updated_at);