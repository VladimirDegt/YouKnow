import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_URL_SERVER;

export interface ContentResponse {
  message: string;
}

export const contentService = {
  async getContent(prompt: string, route: string): Promise<ContentResponse> {
    try {
      const response = await axios.post<ContentResponse>(`${API_URL}/content/${route}`, { prompt });
      return response.data;
    } catch (error) {
      console.error('Error fetching content:', error);
      throw error;
    }
  }
};
