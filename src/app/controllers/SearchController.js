const { searchNovel } = require('../../utils/sqliteSearch')

class SearchController {
    async search(req, res){
        console.log(req.query);
        var name = req.query.q;
        console.log(searchNovel(name));
        function renderNovel() {
            return res.render('search',{
                list: searchNovel(name)
            });
        }
        async function sleep(fn, par) {
            return await setTimeout(async function() {
              await fn(par);
            }, 500, fn, par);}
        const data = await sleep(renderNovel, false);

    }
    
    async show(req, res)
    {
        var name = req.query.q;
        console.log(searchNovel(name));
        function renderNovel() {
            return res.render('chapter',{
                list: searchNovel(name)
            });
        }
        async function sleep(fn, par) {
            return await setTimeout(async function() {
              await fn(par);
            }, 500, fn, par);}
        const data = await sleep(renderNovel, false);
    }
}

module.exports = new SearchController();