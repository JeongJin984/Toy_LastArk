create table user_info (
    username varchar(16) UNIQUE NOT NULL,
    rep_character_name varchar(16) NOT NULL,

    primary key (username)
);

create table rade (
    rade_id integer not null auto_increment,
    title varchar(255),
    content text,
    created_at datetime(6),
    start_at datetime(6),
    raid_info json,
    writer_id varchar(16),
    foreign key (writer_id) references user_info(username),

    primary key (rade_id)
);

create table user_rade_apply (
    apply_id integer not null auto_increment,
    state varchar(10),
    character_info json,
    is_master bool,
    created_at datetime(6),

    user_id varchar(16),
    foreign key (user_id) references user_info(username),
    rade_id integer(16),
    foreign key (rade_id) references rade(rade_id),

    primary key (apply_id)
);