class HomepageController {
    static instance;
    app;

    constructor(app) {
        if (!!HomepageController.instance) {
            return HomepageController.instance;
        }
        HomepageController.instance = this;

        this.app = app;
        this.initRoutes(app, '/');

        return this;
    }

    initRoutes(app, url) {
        app.get(`${url}`, async function (req, res) {
            res.render('index');
        });
    }
}

module.exports = {
    HomepageController: HomepageController
};