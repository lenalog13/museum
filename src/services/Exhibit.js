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
}



