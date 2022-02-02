const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('./config/Configurator')();
const cors = require('cors');

const BodyParserMiddleware = require('./utils/middleware/BodyParserMiddleware');
const {MongoDB} = require("./db/MongoDB");

const {GalleryService} = require("./services/GalleryService");
const {AuthenticationService} = require("./services/AuthenticationService");
const {UserService} = require("./services/UserService");
const {TagService} = require("./services/TagService");

const {GalleryController} = require("./rest-controllers/GalleryController");
const {HomepageController} = require("./rest-controllers/HomepageController");
const {AuthenticationController} = require("./rest-controllers/AuthenticationController");
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

        const layouts = require('express-ejs-layouts');
        app.use(layouts);
        app.set('view engine', 'ejs');

        app.use(BodyParserMiddleware.bodyParserJsonException);//do wyjatkow blednego parsowania json
        app.use(bodyParser.json()); // do parsowania rest
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(cookieParser());
    }

    loadDB = () => {
        new MongoDB();
        MongoDB.instance.connect();
    }

    loadServices(){
        new UserService();
        new AuthenticationService();
        new TagService();
        new GalleryService();
    }

    loadControllers(app){
        new HomepageController(app);
        new AuthenticationController(app);
        new UserRestController(app);
        new TagController(app);
        new GalleryController(app);
    }
}

module.exports = {
    WebServer
}