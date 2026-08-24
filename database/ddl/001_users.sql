--DROP TABLE users;

CREATE TABLE users (
    user_id             UUID            NOT NULL,
    email               VARCHAR(255)    NOT NULL,
    password_hash       VARCHAR(255)    NOT NULL,
    user_name           TEXT            NOT NULL,
    refresh_token_hash  TEXT,
    created_at          TIMESTAMPTZ     NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMPTZ     NOT NULL    DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT pk_users
        PRIMARY KEY (user_id),

    CONSTRAINT unique_users_email
        UNIQUE (email)
);