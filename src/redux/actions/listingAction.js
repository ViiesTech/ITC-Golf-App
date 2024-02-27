import axios from 'axios';
import constant, {URL} from '../constant';
import {ShowToast} from '../../Custom';

export const createListing = (
  location,
  description,
  suggested_day,
  suggested_time,
  how_many_players,
  area_code,
  itc_handshake,
  desired_tee,
  drinking_friendly,
  private_listing,
) => {
  return async dispatch => {
    dispatch({
      type: constant.CREATE_LISTING,
    });

    let payload = {
      location_golfclub: location,
      description: description,
      suggested_day: suggested_day,
      suggested_time: suggested_time,
      how_many_players: how_many_players,
      area_code: area_code,
      the_itc_handshake: itc_handshake,
      desired_tee_box: desired_tee,
      drinking_friendly: drinking_friendly,
      private_match: private_listing,
    };

    await axios
      .post(`${URL}/create_match`, payload, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then(res => {
        console.log('create listing response =================>', res.data);
        if (res.data.listing_id) {
          dispatch({
            type: constant.CREATE_LISTING_DONE,
          });
          ShowToast(res.data.message);
        } else {
          dispatch({
            type: constant.CREATE_LISTING_DONE,
          });
          ShowToast(res.data.message);
        }
      })
      .catch(error => {
        dispatch({
          type: constant.CREATE_LISTING_DONE,
        });
        return ShowToast('Check your network, Try Again!' || error.code);
      });
  };
};

export const ListingsByUserID = user_id => {
  return async dispatch => {
    dispatch({
      type: constant.GET_MY_LISTINGS,
    });

    await axios
      .get(`${URL}/matches/${user_id}`, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then(res => {
        console.log('my listing response ===========>', res.data);
        dispatch({
          type: constant.GET_MY_LISTINGS_DONE,
          payload: res.data,
        });
      })
      .catch(error => {
        console.log('my listings error ========>', error);
        dispatch({
          type: constant.GET_MY_LISTINGS_DONE,
        });
        return ShowToast('Some problem occured');
      });
  };
};
