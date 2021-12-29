create table if not exists todos (
    id bigint primary key,
    title varchar(255) not null,
    description varchar(255) not null,
    due_date date not null,
    priority varchar(255) not null,
    email varchar(255) not null
);
