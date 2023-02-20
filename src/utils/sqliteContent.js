var fs = require("fs")
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./models/database.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the chinook database.');
});
let listChapters = [];
let listContent = [];

module.exports = {
    getContent: function(name) {
        console.log(name);
        db.serialize(() => {
            db.each(`SELECT *
                    FROM Novel_Chapter as NC, Chapter as C
                    WHERE (NC.NID LIKE '%${name}%') and (NC.CID = C.CID )
                    `, (err, row) => {
            if (err) {
                console.error(err.message);
            }
            listChapters.push(row.Content);
            // console.log(listChapters);
            });
            // console.log(listChapters);
        });
        // lỗi
          // console.log(listChapters);
        listContent.slice(0,-1);
        listChapters = listChapters.slice(listChapters.length-5,listChapters.length);
        listChapters.forEach(function(row) {
            var text = fs.readFileSync(row).toString();
            listContent.push(text);
        });
          // console.log(listContent);
        var list = [];
        list = listContent.slice(listContent.length-5,listContent.length);
        // list = listContent;
        var i = 0;
        var list1 = [];
        list.forEach(function(content){
          i += 1;
          var ele = {
            stt: i,
            content: content,
          }
          list1.push(ele);
        });
        // console.log(list1);
        return list1;
      
}
}