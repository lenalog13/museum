import $api from "../http";

export default class Exhibit {

    static async createExhibit(exhibitName) {
        const response = await $api.post('/exhibit/create', {
            exhibitName: exhibitName
        });
        return response.data;
    }

    static getExhibitByName(name) {
        return $api.get('/exhibit/get_by_name', {
            params: {
                name: name
            }
        });
    }

    static async getExhibitsByShelfId(shelfId) {
        const response = await $api.get(`/exhibit/get_by_shelf_id/${shelfId}`);
        return response.data;
    }

    static async addExhibitToShelf(exhibitId, descriptionId, shelfId, exhibitionId) {
        const response = await $api.post('/exhibition/add_exhibit', {
            exhibitId: exhibitId,
            descriptionId: descriptionId,
            shelfId: shelfId,
            roomId: null,
            exhibitionId: exhibitionId
        });
        return response.data;
    }

    static async getExhibitDescriptions(id) {
        const response = await $api.get(`/exhibit/get_exhibit_descriptions/${id}`);
        return response.data; 
    }

    static async createExhibitDescription(description, exhibitId) {
        const response = await $api.post('/exhibit/create_description', {
            description: description,
            exhibitId: exhibitId
        });
        return response.data;
    }
}