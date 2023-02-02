const Router = require('./theme');

const siteRouter = require('./site');

function route(app){
    
    app.use('/romance', Router);
    app.use('/adventure', Router);
    app.use('/thriller', Router);
    app.use('/fantasy', Router);
    app.use('/', siteRouter);


}

module.exports = route;