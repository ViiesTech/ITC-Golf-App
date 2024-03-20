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

export const addToWishlist = (user_id, product_id) => {
  return async dispatch => {
    var data = new FormData();

    data.append('product_id', product_id);

    return await axios
      .post(`${URL}/wishlist/add/?user_id=${user_id}&product_id=${product_id}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        console.log('wishlist add response =============>', res.data);
        if (res.data.success) {
          return res.data;
        } else {
          return ShowToast(res.data.message);
        }
      })
      .catch(error => {
        console.log(error);
        return ShowToast('Some problem occured');
      });
  };
};

export const removeFromWishlist = (user_id, product_id) => {
  return async dispatch => {
    return await axios
      .post(
        `${URL}/remove-wishlist-items/?user_id=${user_id}&product_id=${product_id}`,
        {},
        {
          headers: {
            Accept: 'application/json',
          },
        },
      )
      .then(res => {
        if (res.data.success) {
          return res.data;
        } else {
          return ShowToast(res.data.message);
        }
      })
      .catch(error => {
        console.log('remove from wishlist error =========>', error);
        return ShowToast('Some problem occured');
      });
  };
};
