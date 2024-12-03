import $api from "../http";

export default class Exhibition {
    static getExhibition() {
        return $api.get('/exhibition/getAll');
    }

    static deleteExhibition(id) {
        return $api.delete(`/exhibition/delete/${id}`);
    }

    static createExhibition(data) {
        return $api.post('/exhibition/create', data);
    }

    static updateExhibition(data) {
        return $api.put('/exhibition/update', data);
    }

    static getExhibitionById(id) {
        return $api.get(`/exhibition/get/${id}`);
    }
}