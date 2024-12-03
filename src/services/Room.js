import $api from "../http";

export default class Room {
    static getRooms() {
        return $api.get('/storage_unit/get_all_rooms');
    }
}