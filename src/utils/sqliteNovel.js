var fs = require("fs")
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./models/database.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the chinook database.');
});

module.exports = {
    getNovel: function () {
        let list = [];
        db.serialize(() => {
            db.each(`SELECT *
                     FROM Novel
                     WHERE Theme = 'romance' 
                     `, (err, row) => {
              if (err) {
                console.error(err.message);
              }
              let ID_name = row.NID.toString().slice(21, -5);
              var name = ID_name;
              if (ID_name.length > 22)
                  {
                      ID_name = ID_name.slice(0, 24);
                      ID_name = ID_name + '...';
                  }
              ID_name = ID_name.replaceAll('-', ' ');
              var ele = {
                  ID: ID_name,
                  Poster: row.Poster,
                  Name: name,
              };
              list.push(ele);
            });
          });
          return list;
    }
}