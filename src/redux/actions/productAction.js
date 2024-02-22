import axios from 'axios';
import constant, {URL} from '../constant';
import {ShowToast} from '../../Custom';
import FormData from 'form-data';

export const getProducts = () => {
  return async dispatch => {
    dispatch({
      type: constant.RENDER_PRODUCT,
    });

    await axios
      .get(`${URL}/products`, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then(res => {
        // console.log('products response =======================>', res.data)
        dispatch({
          type: constant.RENDER_PRODUCT_DONE,
          payload: res.data,
        });
      })
      .catch(error => {
        dispatch({
          type: constant.RENDER_PRODUCT_DONE,
        });
        return ShowToast('Check your network, Try Again!' || error.code);
      });
  };
};

export const getProductDetails = product_id => {
  return async dispatch => {
    dispatch({
      type: constant.RENDER_DETAILS,
    });

    await axios
      .get(`${URL}/products/${product_id}`, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then(res => {
        dispatch({
          type: constant.RENDER_DETAILS_DONE,
          payload: res.data,
        });
      })
      .catch(error => {
        dispatch({
          type: constant.RENDER_DETAILS_DONE,
        });
        return ShowToast('Check your network, Try Again!' || error.code);
      });
  };
};

export const addToWishlist = product_id => {
  var data = new FormData();

  data.append('product_id', product_id);

  return async dispatch => {
    return await axios
      .post(`${URL}/wishlist/add`, data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        console.log('wishlist add response =============>', res.data);
        if (res.data.success) {
          dispatch({
            type: constant.ADD_TO_WISHLIST,
            payload: true,
          });
          return res.data;
        } else {
          return false;
        }
      })
      .catch(error => {
        console.log(error);
        return false;
      });
  };
};


