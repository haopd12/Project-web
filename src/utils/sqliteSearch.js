var fs = require("fs")
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./models/database.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the chinook database.');
});
let list = [];
var i = 1;
module.exports ={
    searchNovel: function(name)
    {
        // let list1 = [];
        db.serialize(() => {
            let list1 = [];
            db.each(`SELECT *
                     FROM Novel
                     WHERE NID LIKE '%${name}%' 
                     `, (err, row) => {
              if (err) {
                console.error(err.message);
              }
              let ID_name = row.NID.toString().slice(21, -5);
            //   console.log(ID_name);
              var name1 = ID_name;
              if (ID_name.length > 22)
                  {
                      ID_name = ID_name.slice(0, 22);
                      ID_name = ID_name + '...';
                  }
              // if (ID_name.length < 22)
              //     {
              //       ID_name = ID_name + ' ...';
              //     }
              ID_name = ID_name.replaceAll('-', ' ');
              var ele = {
                  ID: ID_name,
                  Poster: row.Poster,
                  Name: name1,
                  url_route: name
              };
              list.push(ele);
            //   console.log(list);
              list1 = list;
            //   console.log(list1);
            });
            // console.log(list1);
          });
          let list1 = list;
          console.log(list);
          list = [];
          return list1;
    }
}