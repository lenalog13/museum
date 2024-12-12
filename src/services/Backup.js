import $api from "../http";

export default class Backup {
    static postBackup() {
        return $api.post('/backup/create');
    }
}