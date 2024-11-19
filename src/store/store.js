import { makeAutoObservable } from "mobx";
import Auth from "../services/Auth";

export default class Store {
    isAuth = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    async login(username, password) {
        try {
            const response = await Auth.login(username, password);
            console.log(response)
            localStorage.setItem('token', response.data.token);
            this.setAuth(true);
            return true;
        } catch(e) {
            console.log(e.response);
            return false;
        }
    }
}