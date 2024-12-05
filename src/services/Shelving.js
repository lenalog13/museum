import $api from "../http";

export default class Shelving {

    static getShelvings(roomId) {
        return $api.get(`/storage_unit/get_shelvings/${roomId}`);
    }

    static createShelving(shelvingNumber, roomId, exhibitionId, description) {
        const requestBody = {
            shelvingNumber,
            roomId,
            exhibitionId,
            description
        };

        return $api.post('/storage_unit/create_shelving', requestBody);
    }

    static deleteShelving(shelvingId) {
        return $api.delete(`/storage_unit/delete_shelving/${shelvingId}`);
    }
}