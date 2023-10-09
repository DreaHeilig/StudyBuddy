-- Create the user table
CREATE TABLE user (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    locations_id DATE,
    profilepic VARCHAR(50)
);

-- Create the location table
CREATE TABLE locations (
    locations_id SERIAL PRIMARY KEY,
    locations VARCHAR(255) NOT NULL,
);

-- Create the post table
CREATE TABLE posts (
    posts_id SERIAL PRIMARY KEY,
    activity VARCHAR(255) NOT NULL,
    'description' VARCHAR(255) NOT NULL,
    adress VARCHAR(255) NOT NULL,
    nimage VARCHAR(50)
);

-- Create the request table
CREATE TABLE request (
    request_id SERIAL PRIMARY KEY,
    accept VARCHAR(255) NOT NULL,
    post_id VARCHAR(255) NOT NULL,
    created_at DATE,
    user_id VARCHAR(255) NOT NULL,
);

