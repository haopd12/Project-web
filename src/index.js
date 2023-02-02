const path = require('path');
const express = require('express');
const { engine } = require("express-handlebars");
const app = express();
const port = 3000;
const morgan = require('morgan');
const route = require('./routes');
const sqlite3 = require('sqlite3').verbose();

app.use(express.static(path.join(__dirname,'/public')));
app.use(morgan('combined'));

app.engine( "hbs", engine({extname: '.hbs'}) );
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

route(app);


app.listen(port, () => {
  console.log(`Example app listening at https://localhost:${port}`)
})


// open the database
// let db = new sqlite3.Database('./models/database.db', sqlite3.OPEN_READWRITE, (err) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log('Connected to the chinook database.');
// });

// db.serialize(() => {
//   db.each(`SELECT *
//            FROM Novel
//            `, (err, row) => {
//     if (err) {
//       console.error(err.message);
//     }
//     console.log(row.NID + "\t" + row.Theme);
//   });
// });