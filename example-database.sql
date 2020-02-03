

CREATE TABLE public.users (
	id SERIAL PRIMARY KEY,
	email TEXT NOT NULL
);

CREATE TABLE public.posts (
	id SERIAL PRIMARY KEY,
	user_id INT NOT NULL REFERENCES public.users(id),
	headline TEXT NOT NULL,
	content TEXT NOT NULL	
);

CREATE TABLE public.comments (
	id SERIAL PRIMARY KEY,
	user_id INT NOT NULL REFERENCES public.users(id),
	post_id INT NOT NULL REFERENCES public.posts(id),
	content TEXT NOT NULL
);