-- ELIMINAR TABLA
drop table customers;

-- ELIMINAR FILA TABLA
delete from users; -- ELIMINA TODA LAS FILAS DE UNA TABLA / ESPECIFICAR CON "WHERE" PARA EVITAR BORRAR TODO POR ERROR.

-- CREAR TABLA

create table users (
	user_id 			serial primary key,
	user_name 			varchar(20) unique not null, -- VALOR DUPLICADO NO PERMITIDO
	user_email 			varchar(50) unique not null, -- VALOR DUPLICADO NO PERMITIDO
	user_password 		varchar(350) not null, 
	user_country 		varchar(70) null,
	twitter_account 	varchar(120) null,
	instagram_account 	varchar(120) null,
	facebook_account 	varchar(120) null,
	youtube_account 	varchar(120) null,
	titok_account 		varchar(120) null
);

create table recipes (
	recipe_id			serial primary key,
	recipe_name			varchar(70) unique not null, -- VALOR DUPLICADO NO PERMITIDO
	recipe_date			date not null,
	recipe_category		varchar(30) not null,
	recipe_portion		int not null,
	recipe_time			int null,
	recipe_difficulty   varchar(12) null,
	recipe_photo		varchar(120) null,
	recipe_video		varchar(80) null,		
	recipe_author		int references users(user_id) not null --OBLIGATORIO AUTOR DE LA RESETA / DEBE EXISTIR EN USERS
);

create table likes (
	like_id				serial primary key,
	likes_recipe		int references recipes(recipe_id), -- RECETA A LA QUE SE LE DIO LIKES/DEBE EXISTIR EN RECIPES
	numbers_likes		int null,
	who_likes			int references users(user_id) -- USARIO QUE DIO LIKES / SOLO PUEDE DAR UNO POR RECETA(server) / DEBE EXISTIR EN USERS
	
);

create table instructions (
	instruction_id		serial primary key,
	instruction_text	varchar(350) not null,
	instruction_tips 	varchar(350) null,
	instruction_recipe  int references recipes(recipe_id) not null --OBLIGATORIO RECETA A LA QUE PERTENECE  / DEBE EXISTIR EN RECIPES
);

create table ingredients (
	ingredient_id		serial primary key,
	ingredint_name		varchar(120) not null,
	ingredient_category varchar(30) null,
	ingredient_unit		int null, 
	ingredient_weight	int null, -- CONFIGURAR DESDE LA APP QUE SE ENVIE UNIT O WEIGHT OBLIGATORIO
	ingredient_recipe	int references recipes(recipe_id) not null
);

-- AÑADIR UNA COLUMNA A UNA TABLA
-- 	INSTRUCTIONS
alter table instructions add column instruction_tips varchar(350) null;

-- INSERTAR VALORES A UNA TABLA
-- USERS
insert into users (user_name, user_email, user_password) values (lower('brujola'), 'ronar@fake.com', 'Ronar123') returning user_id, user_name, user_password;

insert into users (user_name, user_email, user_password) values ('ramon', 'ronar@fake.com', 'ronar123'); -- no es posible valor duplicado.

-- RECIPES
insert into recipes (recipe_name, recipe_date, recipe_category, recipe_portion, recipe_user) values ('Salmon al Romero', '07/24/2021', 'Pescado', 4, 3);

-- INSTRUCTIONS
insert into instructions (instruction_text, instruction_tips, instruction_recipe) values ('dkjkdjdkjdkjdkdjdkjdkj kddd', 'kjdkdkjd', 6);

-- BUSCAR VALORES EN UNA TABLA
select user_name, user_email from users;
select * from recipes r;
select * from instructions i;
select * from ingredients;
