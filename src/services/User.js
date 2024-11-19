import $api from "../http";
import {AxiosResponse} from 'axios';

export default class User {
    static fetchUsers() {
        return $api.get('/user')
    }
}