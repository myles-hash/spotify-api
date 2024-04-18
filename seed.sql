CREATE TABLE albums (
id SERIAL PRIMARY KEY,
album_id text,
album_image_url text,
album_name text,
spotify_link text,
album_artist text,
spot_album_review text,
spot_album_score text,
user_id text
);

INSERT INTO albums (album_id, album_image_url, album_name, spotify_link, album_artist,) 
VALUES ('5EUgcfO5OWxnniHR3QYFcK', 'https://i.scdn.co/image/ab67616d0000b273c926cc5c75394291893ee86b',
'The Marshall Mathers LP2 (Expanded Edition)', 'https://open.spotify.com/album/5EUgcfO5OWxnniHR3QYFcK', 'Eminem', 
'This was good', '5', ''
);


DROP TABLE reviews;

CREATE TABLE reviews (
id SERIAL PRIMARY KEY,
album_id text,
album_image_url text,
album_name text,
spotify_link text,
album_artist text,
album_score text,
album_review text,
fav_track text
);

INSERT INTO reviews (album_id, album_image_url, album_name, spotify_link, album_artis, album_score, album_review, user_id) 
VALUES ('5EUgcfO5OWxnniHR3QYFcK', 'https://i.scdn.co/image/ab67616d0000b273c926cc5c75394291893ee86b',
'The Marshall Mathers LP2 (Expanded Edition)', 'https://open.spotify.com/album/5EUgcfO5OWxnniHR3QYFcK', 'Eminem', 
'5', 'This was good I guess', 'user_2cay5RTJ1gTJacLlYox8bHhdNw3'
);

CREATE TABLE posts (
id SERIAL PRIMARY KEY,
title VARCHAR(225),
content TEXT
);



INSERT INTO posts (title, content) VALUES
('This is the first post','hi');

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    username text,
    content text,
    review_id INT REFERENCES reviews(id)
);

INSERT INTO comments (username, content, post_id) VALUES
('Myles','This is a comment on the first post', 1);

ALTER TABLE posts ADD user_id text;

ALTER TABLE comments ADD user_id text;

UPDATE posts SET user_id = 'user_2bmkAoKOFFLvZ7YfPJAz6NxgnWu';

UPDATE comments SET user_id = 'user_2bmkAoKOFFLvZ7YfPJAz6NxgnWu';

CREATE TABLE profiles (
id SERIAL PRIMARY KEY,
clerk_user_id text,
username text,
bio text
);

ALTER TABLE reviews ADD user_id text;