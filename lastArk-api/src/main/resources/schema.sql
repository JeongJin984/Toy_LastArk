create table user_info (
    user_id varchar(16),
    username varchar(16) NOT NULL,
    profile_image varchar(100),

    primary key (user_id)
);

create table posting (
    posting_id integer not null auto_increment,
    title varchar(255),
    content text,
    created_at datetime(6),
    writer_id varchar(16),
    category varchar(30),
    guild_name varchar(30),

    foreign key (writer_id) references user_info(user_id) ,

    primary key (posting_id)
);

create table posting_comment (
    comment_id integer not null auto_increment,
    content varchar(255),
    created_at datetime(6),
    posting_id integer,
    writer_id varchar(16),
    parent_comment_id integer,

    foreign key (posting_id) references posting(posting_id),
    foreign key (writer_id) references user_info(user_id),
    foreign key (parent_comment_id) references posting_comment(comment_id),

    primary key (comment_id)
);

create table rade (
    rade_id integer not null auto_increment,
    title varchar(255),
    content text,
    created_at datetime(6),
    start_at datetime(6),
    raid_info text,

    writer_id varchar(16),

    foreign key (writer_id) references user_info(user_id),

    primary key (rade_id)
);

create table rade_comment (
    comment_id integer not null auto_increment,
    content text,
    created_at datetime(6),
    raid_member varchar(200),

    writer_id varchar(16),
    rade_id integer,

    foreign key (writer_id) references user_info(user_id),
    foreign key (rade_id) references rade(rade_id),

    primary key (comment_id)
);