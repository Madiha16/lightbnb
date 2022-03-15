
-- Our product managers want a query to see the average duration of a reservation.

-- Instruction
-- Get the average duration of all reservations.

-- The approximate expected result is below. Note that depending on how much of your own data you added,
-- your result may differ slightly (but unless you added a ton of your own data, it should still be around 14.6...).

--   average_duration
-- ---------------------
--  14.6636000000000000
-- (1 row)


SELECT avg(end_date - start_date) as average_duration
FROM reservations;

-- Get difference between 2 dates
-- SELECT (end_date - start_date) as average_duration
-- FROM reservations
-- WHERE guest_id = 7;

-- average_duration 
-- ------------------
--                20
--                18
--                11
--                 5
--                 1
--                13
--                26
--                15
--                10
--                 7
-- (10 rows)
