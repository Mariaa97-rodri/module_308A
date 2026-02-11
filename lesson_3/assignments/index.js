// Importing database functions. DO NOT MODIFY THIS LINE.
// import { central, db1, db2, db3, vault } from "./database.js";

import { getUserData } from "./assignment3.js";

//Test cases

getUserData(3)

.then(data => console.log("valid User:", data))
.catch(err => console.error("Error:", err.message));

// function getUserData(id) {
//   const dbs = {
//     db1: db1,
//     db2: db2,
//     db3: db3
//   };
// }
