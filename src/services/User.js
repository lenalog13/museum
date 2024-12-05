import $api from "../http";

export default class User {
    static getUsers() {
        return $api.get('/user/getAll');
    }

    static createUser(user) {
        return $api.post('/user/create', user);
    }

    static deleteUser(id) {
        return $api.delete(`/user/delete/${id}`);
    }

    static getUserById(id) {
        return $api.get(`/user/getById/${id}`);
    }

    static updateUser(user) {
        return $api.put('/user/update_user', user);
    }
}