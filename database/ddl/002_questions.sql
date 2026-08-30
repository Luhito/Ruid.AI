-- DROP TABLE questions;

CREATE TABLE questions (
    qid                 UUID            NOT NULL,
    create_user_id      UUID            NOT NULL,
    rid                 UUID,
    prompt              TEXT            NOT NULL,
    answer_type         CHAR(1)         NOT NULL,
    summary             TEXT            NOT NULL,
    question_text       TEXT            NOT NULL,
    explanation_text    TEXT            NOT NULL,
    tokenct_all         INTEGER,
    tokenct_in          INTEGER,
    tokenct_out         INTEGER,
    tokenct_thought     INTEGER,
    answered_flg        BOOLEAN         NOT NULL DEFAULT FALSE,
    created_at          TIMESTAMPTZ     NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT pk_questions
        PRIMARY KEY (qid),

    CONSTRAINT fk_questions_create_user
        FOREIGN KEY (create_user_id)
        REFERENCES users(user_id),

    CONSTRAINT chk_questions_answer_type
        CHECK (answer_type IN ('N', 'W'))
);
