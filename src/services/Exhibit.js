import $api from "../http";

export default class Exhibit {
    // Method to create a new exhibit
    static async createExhibit(exhibitName) {
        const response = await $api.post('/exhibit/create', {
            exhibitName: exhibitName
        });
        return response.data;
    }

    // Method to get an exhibit by name
    static getExhibitByName(name) {
        return $api.get('/exhibit/get_by_name', {
            params: {
                name: name
            }
        });
    }

    // Method to get exhibits by shelf ID
    static async getExhibitsByShelfId(shelfId) {
        const response = await $api.get(`/api/v1/exhibit/get_by_shelf_id/${shelfId}`);
        return response.data; // Return the list of exhibits
    }

    // Method to add an exhibit to a shelf
    static async addExhibitToShelf(exhibitId, descriptionId, shelfId, exhibitionId) {
        const response = await $api.post('/api/v1/exhibition/add_exhibit', {
            exhibitId: exhibitId,
            descriptionId: descriptionId,
            shelfId: shelfId,
            roomId: null, // Set roomId to null
            exhibitionId: exhibitionId
        });
        return response.data; // Return the response data
    }
}



