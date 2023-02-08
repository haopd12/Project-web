var fs = require("fs")
const sqlite3 = require('sqlite3').verbose();
const { getNovel } = require('../../utils/sqliteNovel')
const { getContent } = require('../../utils/sqliteContent');
// const {loadContent } = require('../../utils/chapterSetting');
var name = '';
// $(document).ready(function() {
//     var html = $("#navbar-examples2").html();
//     console.log(html);
// });

class SiteController
{
    index(req, res) {
        res.render('home', {
            list: getNovel(),
        });
    }
    

    async show(req, res) {
        // console.log(req);
        console.log(getContent(req.params.slug));
        
        function renderNovel() {
            return res.render('theme-site', {
                        listContent: getContent(req.params.slug),
                    });
        }
        async function sleep(fn, par) {
            return await setTimeout(async function() {
              await fn(par);
            }, 500, fn, par);}
        const data = await sleep(renderNovel, false);

    }
}


module.exports = new SiteController();

