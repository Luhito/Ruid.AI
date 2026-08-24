\o /database/init.log
\set ON_ERROR_STOP on

\echo '=== START init.sql ==='

\echo '--- DDL: users ---'
\i /database/ddl/001_users.sql

\echo '--- DDL: questions ---'
\i /database/ddl/002_questions.sql

\echo '--- DDL: choices ---'
\i /database/ddl/003_choices.sql

\echo '--- SEED: users ---'
\i /database/seed/001_users.sql

\echo '--- SEED: questions ---'
\i /database/seed/002_questions.sql

\echo '--- SEED: choices ---'
\i /database/seed/003_choices.sql

\echo '=== END init.sql ==='