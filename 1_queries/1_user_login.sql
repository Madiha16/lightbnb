-- When a user logs in, we will need to get all of their details to compare their email and
-- password, and to show them a customized home page.

-- Instruction
-- Get details about a single user.

-- Select their id, name, email, and password.
-- Select a single user using their email address. Use tristanjacobs@gmail.com for now.
-- Expected result (your id may differ):

--  id |     name      |          email          | password
-- ----+---------------+-------------------------+---------
--  1  | Devin Sanders | tristanjacobs@gmail.com | $2a...
-- (1 row)

-- \i 1_queries/1_user_login.sql

SELECT id, name, email, password
FROM users
WHERE email = 'tristanjacobs@gmail.com';