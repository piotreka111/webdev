const {TagService} = require("../services/TagService");
const {TagDTO} = require("../services/dto/TagDTO");
const {authenticated} = require("../utils/middleware/AuthMiddleware");

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

        app.get(`${url}`, authenticated, async function (req, res) {
            let result;
            try {
                result = await TagService.instance.getAllTags();
            } catch (e) {
                result.message = e.message;
                res.status(400);
                console.log(e.message);
            }
            res.render('tag_list', {
                tags: result
            });
        });

        app.post(`${url}`, authenticated, async function (req, res) {
            console.log("delete")
            let result = new TagDTO();
            try {
                const id = req.query.delete;
                const deletedTagResult = await TagService.instance.deleteTag(id);
                const tags = await TagService.instance.getAllTags();
                result = {
                    tags: tags,
                    deleteResult: deletedTagResult
                }
            } catch (e) {
                result.message = e.message;
                res.status(400);
                console.log(e.message);
            }
            res.render('tag_list', {
                tags: result
            });
        });


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
            res.render('tag', {
                tag: result
            });
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
    }
}

module.exports = {
    TagController: TagController
};