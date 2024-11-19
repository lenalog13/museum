import $api from "../http";

export default class Auth {
    static async login(username, secret) {
        return $api.post('/auth/login', {username, secret})
    }
}