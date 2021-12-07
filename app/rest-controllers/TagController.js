const {TagService} = require("../services/TagService");
const {TagDTO} = require("../services/dto/TagDTO");

class TagController {
    static instance;
    app;

    constructor(app) {
        if (!!TagController.instance) {
            return TagController.instance;
        }
        TagController.instance = this;

        this.app = app;
        this.initRoutes(app, '/tags');

        return this;
    }

    initRoutes(app, url){

        app.get(`${url}/:id`, async function (req, res) {
            let result;
            try {
                const {id} = req.params;
                result = await TagService.instance.getTagById(id);
            } catch (e) {
                result.message = e.message;
                res.status(400);
                console.log(e.message);
            }
            res.send(result);
        });

        app.put(`${url}/:id`, async function (req, res) {
            let result = new TagDTO();
            try {
                const {id} = req.params;
                const dto = req.body;
                result = TagService.instance.updateTag(id, dto);
            } catch (e) {
                result.message = e.message;
                res.status(400);
                console.log(e.message);
            }
            res.send(result);
        });

        app.post(`${url}`, async function (req, res) {
            let result = new TagDTO();
            try {
                const dto = req.body;
                result = TagService.instance.createTag(dto);
            } catch (e) {
                result.message = e.message;
                res.status(400);
                console.log(e.message);
            }
            res.send(result);
        });

        app.delete(`${url}/:id`, async function (req, res) {
            let result = new TagDTO();
            try {
                const {id} = req.params;
                result = TagService.instance.deleteTag(id);
            } catch (e) {
                result.message = e.message;
                res.status(400);
                console.log(e.message);
            }
            res.send(result);
        });

    }
}

module.exports = {
    TagController: TagController
};