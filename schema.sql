-- create quiz table

create table
  quiz_feedback (
    id bigint primary key generated always as identity,
    userId text default null,
    response text default null,
    reason text default null,
    questionId text default null,
    created_at date default current_timestamp
  );

  -- create quiz table

create table
  quiz (
    id bigint primary key generated always as identity,
    userId uuid,
    topic text,
    questions jsonb[],
    submissions jsonb[],
    random_user_id text,
    timeStarted timestamp with time zone,
    timeEnded timestamp with time zone,
    created_at date default current_date
  );