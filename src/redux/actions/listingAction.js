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
  hyperlink,
  user_id,
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
      hyper_link: hyperlink,
      user_id: user_id,
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
            payload: res.data.listing_id,
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

export const JoinListing = (
  user_id,
  post_id,
  listing_id,
  author_email,
  noti_text,
) => {
  return async dispatch => {
    dispatch({
      type: constant.JOIN_LISTING,
    });

    return await axios
      .post(
        `${URL}/join-listing?current_user_id=${user_id}&current_post_id=${post_id}&listing_id=${listing_id}&current_post_author_email=${author_email}&notification_text=${noti_text}`,
        {},
        {
          headers: {
            Accept: 'application/json',
          },
        },
      )
      .then(res => {
        console.log('join listing response =======>', res.data);
        // dispatch({
        //   type: constant.JOIN_LISTING_DONE,
        // });
        return res.data;
      })
      .catch(error => {
        console.log('join listing error =========>', error);
        dispatch({
          type: constant.JOIN_LISTING_DONE,
        });
        return ShowToast('Some problem occured');
      });
  };
};

export const AcceptListing = (
  user_id,
  author_id,
  user_email,
  noti_text,
  listing_id,
) => {
  return async dispatch => {
    dispatch({
      type: constant.ACCEPT_LISTING,
    });

    return await axios
      .post(
        `${URL}/accept-listing-request?sending_user_id=${user_id}&current_author_id=${author_id}&sending_user_email=${user_email}&notification_text=${noti_text}&listing_id=${listing_id}`,
        {},
        {
          headers: {
            Accept: 'application/json',
          },
        },
      )
      .then(res => {
        console.log('accept listing response ========>', res.data);
        dispatch({
          type: constant.ACCEPT_LISTING_DONE,
        });
        return res.data;
      })
      .catch(error => {
        console.log('accept listing error =======>', error);
        dispatch({
          type: constant.ACCEPT_LISTING_DONE,
        });
        return ShowToast('Some problem occured');
      });
  };
};

export const RejectListing = (
  user_id,
  author_id,
  user_email,
  noti_text,
  listing_id,
) => {
  return async dispatch => {
    dispatch({
      type: constant.REJECT_LISTING,
    });

    return await axios
      .post(
        `${URL}/reject-request?sending_user_id=${user_id}&current_author_id=${author_id}&sending_user_email=${user_email}&notification_text=${noti_text}&listing_id=${listing_id}`,
        {},
        {
          headers: {
            Accept: 'application/json',
          },
        },
      )
      .then(res => {
        console.log('reject listing response ========>', res.data);
        dispatch({
          type: constant.REJECT_LISTING_DONE,
        });
        return res.data;
      })
      .catch(error => {
        console.log('reject listing error =======>', error);
        dispatch({
          type: constant.REJECT_LISTING_DONE,
        });
        return ShowToast('Some problem occured');
      });
  };
};
