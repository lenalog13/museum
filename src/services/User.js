import $api from "../http";

export default class User {
    static getUsers() {
        return $api.get('/user/getAll');
    }
    static createUser(user) {
        return $api.post('/user/create', user);
    }
}