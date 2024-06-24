import axios from 'axios';
import {URL} from '../constant';

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
