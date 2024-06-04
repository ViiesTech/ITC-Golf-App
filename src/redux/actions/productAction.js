import axios from 'axios';
import constant, {URL} from '../constant';
import {ShowToast} from '../../Custom';
import FormData from 'form-data';

export const getProducts = () => {
  return async (dispatch, getState) => {
    const wishlist = getState().AuthReducer.wishlist_items;
    // console.log('wishlistttt', wishlist)

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
        console.log('products response =======================>', res.data);
        if (wishlist?.message) {
          dispatch({
            type: constant.RENDER_PRODUCT_DONE,
            payload: res.data,
          });
        } else {
          const update = res.data?.map(product => ({
            ...product,
            favorite: wishlist?.some(
              item => item.product_id == product.product_id,
            ),
          }));
          dispatch({
            type: constant.RENDER_PRODUCT_DONE,
            payload: update,
          });
        }
        // console.log('updated favourite products ======>', update)
      })
      .catch(error => {
        dispatch({
          type: constant.RENDER_PRODUCT_DONE,
        });
        return ShowToast('Some problem occured' || error.code);
      });
  };
};

export const getProductDetails = (
  product_id,
  setProduct_detail,
  setRelatedProducts,
) => {
  return async (dispatch, getState) => {
    const all_products = getState().ProductReducer.products;

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
        setProduct_detail(res.data);
        const related = all_products?.filter(
          p => p.product_id !== res.data.product_id,
        );
        setRelatedProducts(related.slice(0,2));
        dispatch({
          type: constant.RENDER_DETAILS_DONE,
        });
      })
      .catch(error => {
        dispatch({
          type: constant.RENDER_DETAILS_DONE,
        });
        return ShowToast('Some problem occured');
      });
  };
};

export const addToWishlist = (user_id, product_id) => {
  return async dispatch => {
    var data = new FormData();

    data.append('user_id', user_id);
    data.append('product_id', product_id);

    // return console.log('dataaa', data)

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
          return res.data;
        } else {
          return ShowToast(res.data.message);
        }
      })
      .catch(error => {
        console.log('error adding favourite', error);
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


