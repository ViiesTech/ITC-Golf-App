import axios from 'axios';
import {ShowToast} from '../../Custom';
import constant, {URL} from '../constant';

export const getAllAreaCodes = () => {
  return async dispatch => {
    await axios
      .get(`${URL}/area-codes`, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then(res => {
        console.log('all area codes response ===========>', res.data);
        dispatch({
          type: constant.GET_AREA_CODES,
          payload: res.data,
        });
      })
      .catch(error => {
        console.log('area codes error ========>', error);
        return ShowToast('Some problem occured');
      });
  };
};

export const getListings = () => {
  return async dispatch => {
    dispatch({
      type: constant.GET_LISTING,
    });

    await fetch(`${URL}/matches`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then(async res => {
        const data = await res.json();
        console.log('listing response =======================>', data);
        dispatch({
          type: constant.GET_LISTING_DONE,
          payload: data,
        });
      })
      .catch(error => {
        console.log('listing errrorr =================>', error);
        dispatch({
          type: constant.GET_LISTING_DONE,
        });
        return ShowToast('Check your network, Try Again!' || error.code);
      });
  };
};

export const getGroups = () => {
  return async dispatch => {
    dispatch({
      type: constant.GET_GROUPS,
    });

    await fetch(`${URL}/all-groups`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then(async res => {
        const group = await res.json();
        console.log('group responsee ============>', group);
        dispatch({
          type: constant.GET_GROUPS_DONE,
          payload: group,
        });
      })
      .catch(error => {
        console.log('group errorrrr ==============>', error);
        dispatch({
          type: constant.GET_GROUPS_DONE,
        });
        return ShowToast('Check your network, Try Again!' || error.code);
      });
  };
};

export const getReviews = () => {
  return async dispatch => {
    dispatch({
      type: constant.GET_REVIEWS,
    });

    await axios
      .get(`${URL}/reviews`, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then(res => {
        // console.log('reviews response ================>', res.data)
        dispatch({
          type: constant.GET_REVIEWS_DONE,
          payload: res.data,
        });
      })
      .catch(error => {
        dispatch({
          type: constant.GET_REVIEWS_DONE,
        });
        return ShowToast('Check your network, Try Again!' || error.code);
      });
  };
};

export const getNotifications = (user_id) => {
  return async dispatch => {
    dispatch({
      type: constant.GET_NOTIFICATIONS,
    });

    await axios
      .get(`${URL}/notifications/${user_id}`, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then(res => {
        dispatch({
          type: constant.GET_NOTIFICATIONS_DONE,
          payload: res.data,
        });
      })
      .catch(error => {
        dispatch({
          type: constant.GET_NOTIFICATIONS_DONE,
        });
        console.log('notifications error ====>', error);
        return ShowToast('Some problem occured');
      });
  };
};

export const GroupsByAreaCodes = area_code => {
  return async dispatch => {
    dispatch({
      type: constant.GROUPS_BY_AREACODE,
    });

    await axios
      .get(`${URL}/group-search?area_code=${area_code}`, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then(res => {
        console.log('groups filter response =========>', res.data);
        dispatch({
          type: constant.GROUPS_BY_AREACODE_DONE,
          payload: res.data,
        });
      })
      .catch(error => {
        console.log('groups filter error ========>', error);
        dispatch({
          type: constant.GROUPS_BY_AREACODE_DONE,
        });
        return ShowToast('Some problem occured');
      });
  };
};

export const ListingsByAreaCodes = area_code => {
  return async dispatch => {
    dispatch({
      type: constant.LISTINGS_BY_AREACODE,
    });

    await axios
      .get(`${URL}/search?area_code=${area_code}`, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then(res => {
        console.log('listing filter response =======>', res.data);
        dispatch({
          type: constant.LISTINGS_BY_AREACODE_DONE,
          payload: res.data,
        });
      })
      .catch(error => {
        console.log('listings filter error =========>', error);
        dispatch({
          type: constant.LISTINGS_BY_AREACODE_DONE,
        });
        return ShowToast('Some problem occured');
      });
  };
};
