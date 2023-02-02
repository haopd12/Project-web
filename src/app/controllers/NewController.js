const { loadNovel } = require('../../utils/sqliteTheme')
const { getContent } = require('../../utils/sqliteContent');
// const {getInfo} = require('../../utils/sqliteTheme')
class NewController
{
    index(req, res) {
        var name = req.baseUrl.toString();
        // let title = req.rawHeaders;
        // var ele = title.find(function(ele){
        //     if (ele.includes('localhost:3000/')) return ele;
        // })
        // console.log(ele.substring(22, ele.length));
        // console.log(name.substring(1, name.length));
        
        res.render('chapter', {
            list: loadNovel(name.substring(1, name.length)),
            // name: name.substring(1,name.length)
        });
    }

    async show(req, res) {
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

module.exports = new NewController();

// const newController = require('./NewController');

