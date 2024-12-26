import $api from "../http";

export default class Qr_code {
    static getExhibits() {
        return $api.get('/exhibit/getAll');
    }

    static getShelfs() {
        return $api.get(`/storage_unit/get_all_shelfs_from_exhibitions`);
    }

    static getShelvings() {
        return $api.get('/storage_unit/get_all_shelings_from_exhibitions');
    }

    static getRooms() {
        return $api.get('/storage_unit/get_all_rooms');
    }

}