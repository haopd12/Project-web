const Router = require('./theme');

const siteRouter = require('./site');

// const searchRouter = require('./search');
const searchRouter = require('./search');

function route(app){
    
    app.use('/romance', Router);
    app.use('/adventure', Router);
    app.use('/thriller', Router);
    app.use('/fantasy', Router);
    app.use('/search', searchRouter);
    app.use('/', siteRouter);
    

}

module.exports = route;