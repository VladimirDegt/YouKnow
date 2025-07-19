import axios, { isAxiosError } from 'axios';
import { t } from 'i18next';

const API_URL = "https://iwonder-8z2j.onrender.com";

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

export interface NewsSource {
  title: string;
  link: string;
  image: string;
}

export interface NewsItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  img: string;
  content: string;
}

export interface NewsResponse {
  source: NewsSource;
  items: NewsItem[];
}

export const contentService = {
  async getContent(route: string, lang: string): Promise<ContentResponse> {
    try {
      const response = await axios.post<ContentResponse>(`${API_URL}/content/${route}`, {lang});
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
              throw new Error(t('common.errors.serverErrorWithStatus', {status: error.response.status}));
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
              throw new Error(t('common.errors.serverErrorWithStatus', {status: error.response.status}));
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

const getNews = async (lang: string): Promise<NewsResponse> => {
  try {
    const response = await axios.post<NewsResponse>(`${API_URL}/rss`, { lang });
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
};

export { getNews };

