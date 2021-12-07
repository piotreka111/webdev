const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    role: {
        type: String
    }
});

const Admin = mongoose.model('Admin', AdminSchema)

module.exports = Admin;