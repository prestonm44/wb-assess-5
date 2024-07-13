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

// Problem 02
export const problem02 = await client.query(`
  SELECT o.id 
  FROM orders o
  WHERE o.customer_id IN (
    SELECT c.id  
    FROM customers c
    WHERE c.fname LIKE '%Elizabeth%' AND c.lname LIKE '%Crocker%'
  )
`);

// Problem 03
export const problem03 = await client.query(`
  SELECT SUM (num_cupcakes)
  FROM orders
  WHERE processed = FALSE
`);


// Problem 04
export const problem04 = await client.query(`
  SELECT c.name, SUM (o.num_cupcakes)
  FROM cupcakes c
  LEFT JOIN orders o ON c.id = o.cupcake_id
  GROUP BY c.name
  ORDER BY c.name
`);


// Problem 05
export const problem05 = await client.query(`
  SELECT cust.email, SUM (o.num_cupcakes) as total
  FROM orders o 
  INNER JOIN customers cust on o.customer_id = cust.id
  GROUP BY cust.email
  ORDER BY total DESC
`);


// Problem 06
export const problem06 = await client.query(`
  SELECT DISTINCT fname, lname, email
  FROM customers c
  INNER JOIN orders o on c.id = o.customer_id
  WHERE cupcake_id = 5 AND o.processed = TRUE
`);

client.end();