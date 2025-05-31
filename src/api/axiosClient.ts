import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_OPENAI,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_KEY_OPENAI}`,
  },
});

apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 400:
          console.error('Bad Request:', data.message || 'Invalid request data');
          break;
        case 401:
          console.error('Unauthorized: Please log in again');
          break;
        case 403:
          console.error('Forbidden:', data.message || 'Access denied');
          break;
        case 500:
          console.error('Server Error:', data.message || 'Internal server error');
          break;
        default:
          console.error('Error:', data.message || 'Something went wrong');
      }
    } else {
      console.error('Request Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const api = {
  sendPrompt: async (promptContent: string) => {
    try {
      const defaultBody = {
        input: promptContent,
        model: 'gpt-4.1-mini',
        max_output_tokens: 300,
      };
      return await apiClient.post('', defaultBody);
    } catch (error) {
      throw new Error(`Failed to send prompt: ${error}`);
    }
  }
};

export default apiClient;
