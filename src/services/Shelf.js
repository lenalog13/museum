import $api from "../http";

export default class Shelf {
    
    static getShelvesByShelvingId(shelvingId) {
        return $api.get(`/storage_unit/shelving/${shelvingId}/get_shelfs`);
    }

    static createShelf(shelfData) {
        return $api.post('/storage_unit/create_shelf', shelfData);
    }

    static deleteShelf(shelfId) {
        return $api.delete(`/storage_unit/delete_shelf/${shelfId}`);
    }
}