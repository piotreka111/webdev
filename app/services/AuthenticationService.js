const {v4: uuidv4} = require('uuid');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {UserDTO} = require("./dto/UserDTO");
const User = require("../db/model/User");

const SALT_NUM = 10;

class AuthenticationService {
    static instance;

    constructor() {
        if (!!AuthenticationService.instance) {
            return AuthenticationService.instance;
        }
        AuthenticationService.instance = this;

        return this;
    }

    login = async (dto) => {
        const { login, password } = dto;
        const user = await User.findOne({login});
        if(user) {
            if(!bcrypt.compareSync(password, user.password)) {
                return { errorMessage: 'Login lub hasło niepoprawne!'}
            }
            const token = jwt.sign({id: user.id}, 'secretKey', {expiresIn: '1h'});
            return {
                successMessage: 'Zalogowano',
                token,
            }
        } else {
            return { errorMessage: 'Login lub hasło niepoprawne!'}
        }
    }

    register = async (dto) => {
        if (!dto || !dto.password || !dto.login || !dto.email) {
            return {
                errorMessage: 'Nie wszystkie pola zostały uzupełnione!'
            }
        }

        const foundUser = await User.findOne({
            name: dto.name,
            email: dto.email
        });
        if(foundUser){
            return {
                errorMessage: 'Użytkownik o podanych danych już istnieje!'
            }
        }

        const salt = bcrypt.genSaltSync(SALT_NUM);
        const pwdHash = bcrypt.hashSync(dto.password, salt);

        const user = new User({
            name: dto.name,
            surname: dto.surname,
            login: dto.login,
            password: pwdHash,
            email: dto.email
        });
        await user.save();
        return {
            successMessage: "Konto zarejestrowane"
        }
    }
}

module.exports = {
    AuthenticationService: AuthenticationService
};
