import axios, {isAxiosError} from 'axios';
import {t} from 'i18next';

const API_URL = process.env.EXPO_PUBLIC_URL_SERVER;

export interface ContentResponse {
  message: string;
}

export interface SupportMessage {
  email: string;
  message: string;
}

export interface SupportResponse {
  success: boolean;
  message: string;
}

export const contentService = {
  async getContent(route: string, lang: string): Promise<ContentResponse> {
    try {
      const response = await axios.post<ContentResponse>(`${API_URL}/content/${route}`, { lang });
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 404:
              throw new Error(t('common.errors.contentNotFound'));
            case 500:
              throw new Error(t('common.errors.serverError'));
            default:
              throw new Error(t('common.errors.serverErrorWithStatus', { status: error.response.status }));
          }
        } else if (error.request) {
          throw new Error(t('common.errors.noResponse'));
        } else {
          throw new Error(t('common.errors.requestError'));
        }
      }
      throw new Error(t('common.errors.unknownError'));
    }
  },

  async sendSupportMessage(data: SupportMessage): Promise<SupportResponse> {
    console.log('Sending support message:', data);
    try {
      const response = await axios.post<SupportResponse>(`${API_URL}/support/message`, data);
      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              throw new Error(t('common.errors.invalidData'));
            case 429:
              throw new Error(t('common.errors.tooManyRequests'));
            case 500:
              throw new Error(t('common.errors.serverError'));
            default:
              throw new Error(t('common.errors.serverErrorWithStatus', { status: error.response.status }));
          }
        } else if (error.request) {
          throw new Error(t('common.errors.noResponse'));
        } else {
          throw new Error(t('common.errors.requestError'));
        }
      }
      throw new Error(t('common.errors.unknownError'));
    }
  }
};
