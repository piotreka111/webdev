const {UserDTO} = require("../services/dto/UserDTO");
const {UserService} = require("../services/UserService");

class UserRestController{
    static instance;
    app;

    constructor(app) {
        if (!!UserRestController.instance) {
            return UserRestController.instance;
        }
        UserRestController.instance = this;

        this.app = app;
        this.initRest(app);

        return this;
    }

    initRest(app){
        const rest = (url) => {
            return '/api/user'+url;
        };

        app.get(rest('/:id'), async function (req, res) {
            let result;
            try {
                const {id} = req.params;
                result = UserService.instance.getUserById(id);
            } catch (e) {
                result.message = e.message;
                res.status(400);
                console.log(e.message);
            }
            res.send(result);
        });

        app.put(rest('/:id'), async function (req, res) {
            let result = new UserDTO();
            try {
                const {id} = req.params;
                const dto = req.body;
                result = UserService.instance.updateUser(id, dto);
            } catch (e) {
                result.message = e.message;
                res.status(400);
                console.log(e.message);
            }
            res.send(result);
        });

        app.post(rest(''), async function (req, res) {
            let result = new UserDTO();
            try {
                const dto = req.body;
                result = UserService.instance.createUser(dto);
            } catch (e) {
                result.message = e.message;
                res.status(400);
                console.log(e.message);
            }
            res.send(result);
        });

        app.delete(rest('/:id'), async function (req, res) {
            let result = new UserDTO();
            try {
                const {id} = req.params;
                result = UserService.instance.deleteUser(id);
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
    UserRestController
};