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

const post = async (endpoint, {data,params}, headers = {}) => {
    // console.log('helper function console',params)
  if (params) {
    return apiClient.post(endpoint, null, {params, headers});
  }
  return  apiClient.post(endpoint, data, {headers});
};

export default {
  get,
  post,
};
