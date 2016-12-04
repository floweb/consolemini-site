(function () {
    "use strict";
    var path = require('path');
    const args = process.argv;

    var mode = 'dev';
    if (args.length > 2) {
        mode = args[2];
    }

    var dbPath;
    var apiKeyPath;
    if (mode === 'dev') {
        dbPath = path.join(__dirname, 'consolemini.json');
        apiKeyPath = path.join(__dirname, 'api_key');
    } else {
        dbPath = path.join('/data', 'consolemini.json');
        apiKeyPath = path.join('/data', 'api_key');
    }

    var jsonServer = require('json-server');
    var server = jsonServer.create();
    var router = jsonServer.router(dbPath);

    server.use('/api', router);

    function isAuthorized(req) {
        var fs = require('fs');
        var apiKey = fs.readFileSync(apiKeyPath, 'utf8');

        if (req.get('x-cm-api-key') === apiKey) {
            return true;
        } else {
            return false;
        }
    }

    var middlewares = jsonServer.defaults();
    server.use(function (req, res, next) {
        // We need the homepage to be readable by anyone
        if (req.method === 'GET' &&
            (req.url === '/' ||
             req.url === '/favicon.ico' ||
             req.url === '/db' ||
             req.url.startsWith('/css') ||
             req.url.startsWith('/js'))) {
            next();
        } else {
            if (isAuthorized(req)) {
                // continue to JSON Server router
                console.log('ok');
                next();
            } else {
                console.log('nope');
                res.sendStatus(401);
            }
        }
    });

    server.use(middlewares);
    server.use(router);
    server.listen(3000, function () {
        console.log("ConsoleMini's JSON Server is running");
    });
}());