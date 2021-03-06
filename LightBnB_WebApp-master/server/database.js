const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
// const getUserWithEmail = function(email) {
//   let user;
//   for (const userId in users) {
//     user = users[userId];
//     if (user.email.toLowerCase() === email.toLowerCase()) {
//       break;
//     } else {
//       user = null;
//     }
//   }
//   return Promise.resolve(user);
// }
// tristanjacobs@gmail.com
const getUserWithEmail = (email) => {
  return pool
    .query(`SELECT * FROM users WHERE users.email = $1`, [email])
    .then((result) => {
      // console.log("email::", email);
      // console.log("result.rows::", result.rows[0].email);
      if (email === result.rows[0].email) {
        console.log("emails match!");
        return result.rows[0];
      } else {
        user = null;
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
// const getUserWithId = function(id) {
//   return Promise.resolve(users[id]);
// }
// tristanjacobs@gmail.com
const getUserWithId = (id) => {
  return pool
    .query(`SELECT * FROM users WHERE id = $1`, [id])
    .then((result) => {
      console.log("id::", id);
      console.log("result::", result);
      console.log("result.rows[0].id::", result.rows[0].id);
      if (id === result.rows[0].id) {
        console.log("id's match!");
        return result.rows[0];
      } else {
        user = null;
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getUserWithId = getUserWithId;
// id:: 17

// result:: Result {
//   command: 'SELECT',
//   rowCount: 1,
//   oid: null,
//   rows: [
//     {
//       id: 17,
//       name: 'Devin Sanders',
//       email: 'tristanjacobs@gmail.com',
//       password: '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
//     }
//   ],
//   fields: [ ... etc
// .
// .
// . etc... result is a huge object, result.rows is an array of 1 element, so index of 0, result.rows[0] gives back just the object
// and u can dot into its's properties result.rows[0].id = 17 (id, name, email, password all columns of the users table! (id auto generated when added in table)

//     result.rows[0].id:: 17


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
// const addUser =  function(user) {
//   const userId = Object.keys(users).length + 1;
//   user.id = userId;
//   users[userId] = user;
//   return Promise.resolve(user);
// }
const addUser = (user) => {
  return pool
    .query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;`, [user.name, user.email, user.password])
    .then((result) => {
      console.log("user::", user);
      console.log("result::", result);
      console.log("result.rows[0]::", result.rows[0]);
      // if (id === result.rows[0].id) {
      //   console.log("id's match!");
      //   return result.rows[0];
      // } else {
      //   user = null;
      // }
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.addUser = addUser;
// listening on port 3000 ????
// user:: [Object: null prototype] {
//   name: 'Madi',
//   email: 'madiha1987@gmail.com',
//   password: '$2b$12$qC4qv6TyKcQXGaqpdQiCT.5b35V.fQAtnnqobCXWyvfuIs5wgqYpK'
// }
// result:: Result {
//   command: 'INSERT',
//   rowCount: 1,
//   oid: 0,
//   rows: [
//     {
//       id: 1017,
//       name: 'Madi',
//       email: 'madiha1987@gmail.com',
//       password: '$2b$12$qC4qv6TyKcQXGaqpdQiCT.5b35V.fQAtnnqobCXWyvfuIs5wgqYpK'
//     }
//   ],

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
// const getAllReservations = function(guest_id, limit = 10) {
//   return getAllProperties(null, 2);
// }
//  id: 17, name: 'Devin Sanders', email: 'tristanjacobs@gmail.com',
const getAllReservations = (guest_id, limit = 10) => {
  return pool
    .query(`SELECT thumbnail_photo_url, title, number_of_bedrooms, number_of_bathrooms, start_date, end_date, avg(rating) as average_rating, cost_per_night
    FROM reservations
    JOIN properties ON reservations.property_id = properties.id
    JOIN property_reviews ON properties.id = property_reviews.property_id
    WHERE reservations.guest_id = $1
    GROUP BY properties.id, reservations.id
    ORDER BY reservations.start_date
    LIMIT 10;`, [guest_id])
    .then((result) => {
      // console.log("result::", result); // big huge obj
      // console.log("guest_id::", guest_id);// 17
      console.log("result.rows::", result.rows); // the array of reservations as objects!
      return result.rows;
      // if (id === result.rows[0].id) {
      //   console.log("id's match!");
      //   return result.rows[0];
      // } else {
      //   user = null;
      // }
    })
    .catch((err) => {
      console.log(err.message);
    });
};
exports.getAllReservations = getAllReservations;
// result.rows gives back an array of all the reservations with all the selected columns and their values
//
// Update the getAllReservations function to use the lightbnb database to return reservations associated with a specific user.

// This function accepts a guest_id, limits the properties to 10 and returns a promise. The promise should resolve reservations for that user.

// Tip: Copy the query you built in LightBnB Select to use as a starting point, but alter it so
// that all necessary data is returned to render reservations correctly on the front end.
//
// SELECT title, number_of_bedrooms, number_of_bathrooms, start_date, end_date, avg(rating) as average_rating, cost_per_night
// FROM reservations
// JOIN properties ON reservations.property_id = properties.id
// JOIN property_reviews ON properties.id = property_reviews.property_id
// WHERE reservations.guest_id = ${guest_id}
// // GROUP BY properties.id, reservations.id
// // ORDER BY reservations.start_date
// LIMIT 10;

// THREE DIFFERENT TABLES properties, reservations, property_reviews
// title (from properties)
// number_of_bedrooms (from properties)
// number_of_bathrooms (from properties)
// start_date - end_date (from reservations)
// avg(rating) (from property_reviews)
// cost_per_night (from properties)

// Tip: Recall that if you're building a query that uses multiple tables, you can select all the rows on a specific table with this:

// SELECT table_name.*

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
//<><> return pool AND return result.rows!!
 const getAllProperties = (options, limit = 10) => {
  return pool
    .query(`SELECT * FROM properties LIMIT $1`, [limit])
    .then((result) => {
      console.log(result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;
