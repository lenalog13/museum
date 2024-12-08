import { makeAutoObservable } from "mobx";
import Auth from "../services/Auth";

export default class Store {
    isAuth = false;
    isRole = null;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool, role) {
        this.isAuth = bool;
        this.isRole = role;
    }

    async login(username, password) {
        try {
            localStorage.clear();
            const response = await Auth.login(username, password);
            console.log(response)
            localStorage.setItem('token', response.data.token);
            this.setAuth(true, response.data.role);
            return true;
        } catch(e) {
            console.log(e.response);
            return false;
        }
    }
}