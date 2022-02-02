const {TagService} = require("../services/TagService");
const {TagDTO} = require("../services/dto/TagDTO");
const {authenticated} = require("../utils/middleware/AuthMiddleware");
const {GalleryService} = require("../services/GalleryService");

class GalleryController {
    static instance;
    app;

    constructor(app) {
        if (!!GalleryController.instance) {
            return GalleryController.instance;
        }
        GalleryController.instance = this;

        this.app = app;
        this.initRoutes(app, '/gallery');

        return this;
    }

    initRoutes(app, url) {

        app.get(`${url}`, authenticated, async function (req, res) {
            let result = {errorMessage: undefined};
            try {
                const pictureId = req.query.delete;
                const mode = req.query.mode;
                let deleteData = {errorMessage: undefined};
                if (pictureId) {
                    deleteData = await GalleryService.instance.deletePicture(pictureId, req?.user?.id);
                }
                result = {
                    ...deleteData,
                    pictures: await GalleryService.instance.getAllPictures(req?.user?.id, mode) || []
                };
                if (deleteData.errorMessage) {
                    result.errorMessage += ', ' + deleteData.errorMessage;
                }
            } catch (e) {
                console.log(e);
                result.errorMessage = e.message;
                res.status(400);
            }
            res.render('gallery_list', result);
        });

        app.get(`${url}/add`, async function (req, res) {
            res.render('gallery_add');
        });

        app.post(`${url}/add`, authenticated, async function (req, res) {
            let result = {errorMessage: undefined};
            try {
                const dto = req.body;
                result = await GalleryService.instance.addPicture(dto, req?.user?.id);
            } catch (e) {
                console.log(e);
                result.errorMessage = e.message || 'Błąd';
            }
            res.render('gallery_add', result);
        });

        app.get(`${url}/edit/:id`, authenticated, async function (req, res) {
            let result = {errorMessage: undefined};
            try {
                const picId = req.params.id
                result = await GalleryService.instance.getPictureById(picId, req?.user?.id);
            } catch (e) {
                console.log(e);
                result.errorMessage = e.message || 'Błąd';
            }
            res.render('gallery_edit', result);
        });

        app.post(`${url}/edit/:id`, authenticated, async function (req, res) {
            let result = {errorMessage: undefined};
            try {
                const dto = req.body;
                const picId = req.params.id
                result = await GalleryService.instance.updatePicture(dto, picId, req?.user?.id);
            } catch (e) {
                console.log(e);
                result.errorMessage = e.message || 'Błąd';
            }
            res.redirect('/gallery')
        });

        app.get(`${url}/:id`, async function (req, res) {
            let result = {errorMessage: undefined};
            try {
                const picId = req.params.id;
                result = await GalleryService.instance.getPictureViewById(picId, req?.user?.id);
            } catch (e) {
                console.log(e);
                result.errorMessage = e.message || 'Błąd';
            }
            res.render('gallery_view', result);
        });

        app.post(`${url}/:id`, authenticated, async function (req, res) {
            let result = {errorMessage: undefined};
            try {
                const picId = req.params.id;
                const dto = req.body;
                let addData = await GalleryService.instance.addPictureComment(dto, picId, req?.user?.id);
                result = {
                    ...addData,
                    ...await GalleryService.instance.getPictureViewById(picId, req?.user?.id)
                };
            } catch (e) {
                console.log(e);
                result.errorMessage = e.message || 'Błąd';
            }
            res.render('gallery_view', result);
        });

    }
}

module.exports = {
    GalleryController: GalleryController
};