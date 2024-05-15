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
        dispatch({
          type: constant.GET_AREA_CODES,
          payload: res.data,
        });
      })
      .catch(error => {
        console.log('area codes error ========>', error);
        console.log('area codes error ========>', error.response.data.message);
        return ShowToast('Some problem occured');
      });
  };
};

export const getListings = setListings => {
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
        setListings(data);
        dispatch({
          type: constant.GET_LISTING_DONE,
        });
      })
      .catch(error => {
        console.log('listing errrorr =================>', error);
        console.log(
          'listing errrorr =================>',
          error.response.data.message,
        );
        dispatch({
          type: constant.GET_LISTING_DONE,
        });
        return ShowToast('Some problem occured' || error.code);
      });
  };
};

export const getGroups = setGroups => {
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
        setGroups(group);
        dispatch({
          type: constant.GET_GROUPS_DONE,
        });
      })
      .catch(error => {
        console.log('group errorrrr ==============>', error);
        dispatch({
          type: constant.GET_GROUPS_DONE,
        });
        return ShowToast('Some problem occured' || error.code);
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

export const getNotifications = (user_id, setNotifications) => {
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
        setNotifications(res.data);
        dispatch({
          type: constant.GET_NOTIFICATIONS_DONE,
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

export const AboutSection = () => {
  return async dispatch => {
    dispatch({
      type: constant.GET_ABOUT,
    });

    return await axios
      .get(`${URL}/about-us`, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then(res => {
        console.log('about response ======>', res.data);
        dispatch({
          type: constant.GET_ABOUT_DONE,
          payload: res.data.content,
        });
      })
      .catch(error => {
        console.log('about errror ======>', error);
        dispatch({
          type: constant.GET_ABOUT_DONE,
        });
        return ShowToast('Some problem occured');
      });
  };
};
