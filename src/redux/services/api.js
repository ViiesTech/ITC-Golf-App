import axios from 'axios';
import {URL} from '../constant';

export const NOTIFICATION_CHANNEL_ID = 'ITCGOLF123456'

const apiClient = axios.create({
  baseURL: URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const get = (endpoint, params = {}, headers = {}) => {
  return apiClient.get(endpoint, {params, headers});
};


export default {
  get,
};
