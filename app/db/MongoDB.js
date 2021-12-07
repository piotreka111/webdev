class MongoDB{
    static instance;

    mongoose = require('mongoose');
    url = 'mongodb://localhost:27017/';
    dbName = 'webdev'

    constructor() {
        if (!!MongoDB.instance) {
            return MongoDB.instance;
        }
        MongoDB.instance = this

        return this;
    }

    connect = async () => {
        await this.mongoose.connect(this.url + this.dbName, (e) => {
            if (e) {
                console.log(e)
            } else {
                console.log("Mongoose connected to DB.")
            }
        })
    }

}

module.exports = {
    MongoDB
};
