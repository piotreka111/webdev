const { v4: uuidv4 } = require('uuid');
const Tag = require("../db/model/Tag");
const Comment = require("../db/model/Comment");
const Admin = require("../db/model/Admin");
const Galery = require("../db/model/Galery");
const Token = require("../db/model/Token");
const User = require("../db/model/User");

class GalleryService{
    static instance;

    constructor() {
        if (!!GalleryService.instance) {
            return GalleryService.instance;
        }
        GalleryService.instance = this;

        return this;
    }

    getPictureById = async (pictureId, userId) => {
        const pic = await Galery.findById(pictureId);
        if(!pic || pic.userId !== userId){
            return { errorMessage: 'Błąd podczas zapisu obrazka'}
        }
        return pic;
    }

    getPictureViewById = async (pictureId, userId) => {
        const pic = await Galery.findById(pictureId);
        if(!pic && (pic.display || pic.userId !== userId)){
            return { errorMessage: 'Błąd podczas zapisu obrazka'}
        }
        const comments = await Comment.find({pictureId: pic.id});
        return {picture: pic, comments: comments};
    }

    getAllPictures = async (userId, mode = undefined) => {
        let pictures;
        try{
            if(mode === 'all'){
                pictures = await Galery.find({$or:[{userId: userId},{display:true}]})
            }else {
                pictures = await Galery.find({userId: userId});
            }
        }catch (ex){
            console.log(ex);
        }
        return pictures;
    }

    addPicture = async (dto, userId) => {
        if(!dto?.image?.length>0 || !dto?.title?.length>3 || !dto?.description?.length>3){
            return { errorMessage: 'Nie wszystkie wymagane pola został ustawione!'}
        }

        const picture = new Galery({
            title: dto.title,
            description: dto.description,
            image: dto.image,
            date: new Date().toLocaleDateString() +" "+ new Date().toLocaleTimeString(),
            display: !!dto.display,
            userId: userId,
        })
        await picture.save();

        return {successMessage: 'Dodano zdjęcie'}
    }

    addPictureComment = async (dto, picId, userId) => {
        const pic = await Galery.findById(picId);
        const user = await User.findById(userId);
        if(!pic || !user){
            return { errorMessage: 'Błąd podczas zapisu komentarza'}
        }

        const comment = new Comment({
           content: dto.content,
           pictureId: pic.id,
           date: new Date(),
           user: user.login
        });
        await comment.save();
        return { successMessage: 'dodano komentarz'}
    }

    updatePicture = async (dto, picId, userId) => {
        if(!dto?.image?.length>0 || !dto?.title?.length>3 || !dto?.description?.length>3){
            return { errorMessage: 'Nie wszystkie wymagane pola został ustawione!'}
        }

        const pic = await Galery.findById(picId);
        if(!pic || pic.userId !== userId){
            return { errorMessage: 'Błąd podczas zapisu obrazka'}
        }

        pic.title = dto.title;
        pic.description = dto.description;
        pic.image = dto.image;
        pic.date = `${new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()}`;
        console.log(pic.date)
        pic.display = !!dto.display;
        await pic.save();

        return {successMessage: 'Zaaktualizowano zdjęcie'}
    }

    deletePicture = async (id, userId) => {
        const pic = await Galery.findById(id);
        if(pic && pic.userId === userId){
            await Galery.deleteOne({_id: id})
            return { successMessage: 'Usunięto zdjęcie.'};
        }
        return { errorMessage: 'Nie odnaleziono obrazka do usunięcia.'};
    }
}

module.exports = {
    GalleryService:GalleryService
};
