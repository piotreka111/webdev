const { v4: uuidv4 } = require('uuid');
const Tag = require("../db/model/Tag");
const Comment = require("../db/model/Comment");
const Admin = require("../db/model/Admin");
const Galery = require("../db/model/Galery");
const Picture = require("../db/model/Picture");
const Token = require("../db/model/Token");
const User = require("../db/model/User");

const mockTags = [
    {id:1, description: "tag1"},
    {id:2, description: "tag2"},
    {id:3, description: "tag3"},
    {id:4, description: "tag4"},
];

class TagService{
    static instance;

    constructor() {
        if (!!TagService.instance) {
            return TagService.instance;
        }
        TagService.instance = this;

        return this;
    }

    test = async (id) => {
        const arr = [
            new Tag({description: id}),
            new Admin({role: id}),
            new Comment({content: id, date: new Date()}),
            new Galery({title: id, description: id, date: new Date(), display: false}),
            new Picture({title: id, description: id, date: new Date(), filename: id, path: id, size: id}),
            new Token({token: id}),
            new User({name: id, surname: id, login: id, password: id, email: id})
        ];
        try{
            for(const v of arr){
                await v.save();
            }
        }catch(ex){
            console.log(ex);
        }
    }

    getTagById = async (id) => {
        try{
            // await this.test(id);
        }catch (ex){
            console.log(ex);
        }
        return mockTags.find(u => u.id === +id);
    }

    updateTag = (id, dto) => {
        const index = mockTags.findIndex(u => u.id === id);
        if(index >= 0){
            mockTags[index].description = dto.description;
        }
        return mockTags[index];
    }

    createTag = (dto) => {
        const tag = {
            ...dto,
            id: uuidv4()
        }

        mockTags.push(tag);

        return tag;
    }

    deleteTag = (id) => {
        const index = mockTags.findIndex(u => u.id === id);
        if (index !== -1) {
            mockTags.splice(index, 1);
        }
        return {content: "Tag deleted"};
    }
}

module.exports = {
    TagService: TagService
};
