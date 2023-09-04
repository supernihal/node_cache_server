import axios from 'axios';

class CacheClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get(key: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/get/${key}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response;
      } else {
        console.log(error);
      }
    }
  }

  async put(key: string, value: any) {
    try {
      const response = await axios.post(`${this.baseUrl}/put/${key}`, value);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response;
      } else {
        console.log(error);
      }
    }
  }

  async delete(key: string) {
    try {
      const response = await axios.delete(`${this.baseUrl}/delete/${key}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw error.response;
      } else {
        console.log(error);
      }
    }
  }
}

const client = new CacheClient('http://localhost:3000');

export default client;