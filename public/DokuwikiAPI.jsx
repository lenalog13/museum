import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/lib/plugins/rest/v1',
  headers: {
    Authorization: 'Bearer <ваш_токен>', // Замените на ваш токен
    'Content-Type': 'application/json',
  },
});

// Получение содержимого страницы
export const getPage = async (pageId) => {
  try {
    const response = await apiClient.get(`/pages/${pageId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching page:', error);
    throw error;
  }
};

// Запись содержимого на страницу
export const updatePage = async (pageId, content) => {
  try {
    await apiClient.put(`/pages/${pageId}`, { content });
  } catch (error) {
    console.error('Error updating page:', error);
    throw error;
  }
};
