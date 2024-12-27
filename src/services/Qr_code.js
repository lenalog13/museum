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

    static generateExhibitsQr(exhibitId, descriptionId) {
        const url = '/qr/generate_exhibits_qr';
        const body = {
            exhibitId: exhibitId,
            descriptionId: descriptionId
        };

        return $api.post(url, body);
    }

    static generateExhibitsQr(exhibitId, descriptionId) {
        const url = '/qr/generate_exhibits_qr';
        const body = {
            exhibitId: exhibitId,
            descriptionId: descriptionId
        };

            // Устанавливаем заголовок Content-Type и responseType
    const config = {
        headers: {
            'Content-Type': 'application/json' // Укажите нужный тип контента
        },
        responseType: 'blob' // Устанавливаем responseType для получения файла
    };
    
        return $api.post(url, body, config);
    }

}