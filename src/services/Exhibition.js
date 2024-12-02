import $api from "../http";

export default class Exhibition {
    static getExhibition() {
        return $api.get('/exhibition/getAll')
    }
    static deleteExhibition(id) {
        return $api.delete(`/exhibition/delete/${id}`)
    }
    static createExhibition() {
        return $api.post(`/exhibition/create`)
    }
}