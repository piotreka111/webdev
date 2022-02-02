const {AuthenticationService} = require("../services/AuthenticationService");
const cookie = require('cookie');

class AuthenticationController {
    static instance;
    app;

    constructor(app) {
        if (!!AuthenticationController.instance) {
            return AuthenticationController.instance;
        }
        AuthenticationController.instance = this;

        this.app = app;
        this.initRoutes(app, '/auth');

        return this;
    }

    initRoutes(app, url){

        app.get(`${url}/signin`, async function (req, res) {
            res.render('signin');
        });

        app.post(`${url}/signin`, async function (req, res) {
            let result;
            try{
                result = await AuthenticationService.instance.login(req.body)
            } catch (e) {
                result.message = e.message;
                res.status(400);
                console.log(e.message);
            }
            if(result.token){
                res.cookie('jwtToken', result.token, { maxAge: 9000000, httpOnly: true });
            }
            res.render('signin', result);
        });

        app.get(`${url}/signup`, async function (req, res) {
            res.render('signup');
        });

        app.post(`${url}/signup`, async function (req, res) {
            let result;
            try{
                result = await AuthenticationService.instance.register(req.body)
            } catch (e) {
                result.message = e.message;
                res.status(400);
                console.log(e.message);
            }
            res.render('signup', result);
        });
    }
}

module.exports = {
    AuthenticationController: AuthenticationController
};