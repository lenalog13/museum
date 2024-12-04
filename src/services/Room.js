import $api from "../http";

export default class Room {
    static getRooms() {
        return $api.get('/storage_unit/get_all_rooms');
    }

    static createRoom(roomNumber) {
        return $api.post('/storage_unit/create_room', { roomNumber });
    }

    static getRoomsByExhibitionId(exhibitionId) {
        return $api.get(`/storage_unit/get_rooms_by_exhibition_id/${exhibitionId}`);
    }

    static addRoomToExhibition(roomId, exhibitionId) {
        return $api.post('/exhibition/add_room', { roomId, exhibitionId });
    }
}