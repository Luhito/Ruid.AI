CREATE TABLE rooms (
    room_id     UUID        PRIMARY KEY,
    user_id     UUID        NOT NULL,
    prompt      TEXT        NOT NULL,
    answer_type CHAR(1)     NOT NULL,
    title       TEXT        NOT NULL,
    status      VARCHAR(20) NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_questions_answer_type
        CHECK (answer_type IN ('N', 'W'))
);