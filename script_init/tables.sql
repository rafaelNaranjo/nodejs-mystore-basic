--- Install extension uuid-ossp to manage ID autoincrement in db;
CREATE EXTENSION "uuid-ossp";

CREATE TABLE PRODUCT (
	id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
	name varchar(100) not null,
	description varchar(400) not null,
	price DOUBLE precision not null,
	image varchar(400) null,
	is_blocked boolean default false
);

