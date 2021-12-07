const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('./config/Configurator')();
const cors = require('cors');

const BodyParserMiddleware = require('./utils/middleware/BodyParserMiddleware');
const {MongoDB} = require("./db/MongoDB");

const {UserService} = require("./services/UserService");
const {TagService} = require("./services/TagService");

const {UserRestController} = require("./rest-controllers/UserRestController");
const {TagController} = require("./rest-controllers/TagController");

class WebServer{
    app;
    port;

    constructor(app, port= 8080) {
        this.app = app;
        this.port = port;
    }

    startServer() {
        const app = this.app;

        this.loadConfig(app);
        this.loadDB();
        this.loadServices();
        this.loadControllers(app);

        app.listen(this.port);
        console.log(`========================================`);
        console.log(`=== App running at port ${this.port} ===`);
        console.log(`========================================`);
    }

    loadConfig(app){
        app.use(cors({
            credentials: true,
            origin: config.cors.server
        }));


        app.use(function (req, res, next){
            res.header('Content-Type', 'application/json;charset=UTF-8')
            res.header('Access-Control-Allow-Credentials', true)
            res.header(
                'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'
            );
            next();
        })
        app.use(BodyParserMiddleware.bodyParserJsonException);//do wyjatkow blednego parsowania json
        app.use(bodyParser.json()); // do parsowania rest

        app.use(cookieParser());
    }

    loadDB = () => {
        new MongoDB();
        MongoDB.instance.connect();
    }

    loadServices(){
        new UserService();
        new TagService();
    }

    loadControllers(app){
        new UserRestController(app);
        new TagController(app);
    }
}

module.exports = {
    WebServer
}