CREATE TABLE Novel (
    NID varchar(1000) Primary key,
    Poster varchar(1000),
    Theme varchar(30)
);
CREATE TABLE Chapter(
    CID varchar(1000) Primary key,
    Content varchar(1000),
    Page varchar(50)
);
CREATE TABLE Novel_Chapter(
    NID varchar(1000),
    CID varchar(1000), 
    foreign key(NID) references Novel
    foreign key(CID) references Chapter
);

select * from Novel;