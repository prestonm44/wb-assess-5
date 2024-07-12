import pg from "pg";
const { Client } = pg;

// Setting Up Postgres in Node
const client = new Client({
  // Your postgres user
  user: "prestonmitchell",
  // Postgres password (was set as null during orientation)
  password: null,
  host: "/tmp",
  port: 5432,
  database: "cupcakes",
});

await client.connect();

// Problem 01
export const problem01 = await client.query(`
  SELECT email 
  FROM customers
  ORDER BY email;
`); 
console.log('-- Problem 01 --');
console.log(problem01?.rows);

// // Problem 02
// export const problem02 = await client.query(`
//   SELECT id 
//   FROM orders
//     WHERE fname LIKE '%Elizabeth%' AND lname LIKE '%Crocker%'
//     FROM customers
// `);
// // console.log('-- Problem 02 --');
// // console.log(problem02?.rows);

// Problem 03
export const problem03 = await client.query(`
SELECT COUNT (*)
FROM orders
WHERE processed = FALSE
`);


// Problem 04
export const problem04 = await client.query(`
SELECT SUM (o.num_cupcakes), c.name
FROM orders as o
INNER JOIN cupcakes c ON o.cupcake_id = c.id
GROUP BY c.Name;
`);


// Problem 05
export const problem05 = null;
// console.log('-- Problem 05 --');
// console.log(problem05?.rows);

// Problem 06
export const problem06 = null;
console.log('-- Problem 06 --');
// console.log(problem06?.rows);

client.end();