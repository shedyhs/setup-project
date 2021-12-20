create table public.pokemon (
  id integer primary key,
  name text,
  level integer,
  type text
);

insert into public.pokemon (id, name, level, type) values (1, 'Bulbasaur', 2, 'grass');
insert into public.pokemon (id, name, level, type) values (4, 'Charmander', 7, 'fire');
insert into public.pokemon (id, name, level, type) values (7, 'Squirtle', 5, 'water');
