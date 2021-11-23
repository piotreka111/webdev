const { v4: uuidv4 } = require('uuid');

const mockUsers = [
    {id: 1, imie: "Jan", naziwsko: "Kowalski", login: "jkow", haslo: "123", email: "jkow@wp.pl"},
    {id: 2, imie: "Marek", naziwsko: "Testowy", login: "mtest", haslo: "123", email: "mtest@wp.pl"},
    {id: 3, imie: "Piotr", naziwsko: "Dębowy", login: "pdeb", haslo: "123", email: "pdeb@wp.pl"},
    {id: 4, imie: "Jarek", naziwsko: "Kolorowy", login: "jkol", haslo: "123", email: "jkol@wp.pl"}
];

class UserService{
    static instance;

    constructor() {
        if (!!UserService.instance) {
            return UserService.instance;
        }
        UserService.instance = this;

        return this;
    }

    getUserById = (id) => {
        return mockUsers.find(u => u.id === id);
    }

    updateUser = (id, dto) => {
        const index = mockUsers.findIndex(u => u.id === id);
        if(index >= 0){
            mockUsers[index].imie = dto.imie;
            mockUsers[index].naziwsko = dto.naziwsko;
        }
    }

    createUser = (dto) => {
        const user = {
            ...dto,
            id: uuidv4()
        }

        mockUsers.push(user);

        return user;
    }

    deleteUser = (id) => {
        const index = mockUsers.findIndex(u => u.id === id);
        if (index !== -1) {
            mockUsers.splice(index, 1);
        }
    }
}

module.exports = {
    UserService: UserService
};
