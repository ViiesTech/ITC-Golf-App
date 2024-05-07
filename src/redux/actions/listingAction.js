import axios from 'axios';
import constant, {URL} from '../constant';
import {ShowToast} from '../../Custom';
import FormData from 'form-data';
import {Platform} from 'react-native';

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
  smoking_friendly,
  experience_level,
  private_listing,
  hyperlink,
  user_id,
  photo,
) => {
  return async dispatch => {
    dispatch({
      type: constant.CREATE_LISTING,
    });

    var data = new FormData();

    data.append('location_golfclub', location);
    data.append('description', description);
    data.append('suggested_day', suggested_day);
    data.append('suggested_time', suggested_time);
    data.append('how_many_players', how_many_players);
    data.append('area_code', area_code);
    data.append('the_itc_handshake', itc_handshake);
    data.append('desired_tee_box', desired_tee);
    data.append('drinking_friendly', drinking_friendly);
    data.append('private_match', private_listing);
    data.append('hyper_link', hyperlink);
    data.append('user_id', user_id);
    data.append('experience_level', experience_level);
    data.append('smoking_friendly', smoking_friendly);
    if (photo?.path) {
      data.append('listing_picture', {
        name: `${photo.name}.jpg`,
        type: 'image/jpeg',
        uri:
          Platform.OS === 'android'
            ? photo.path
            : photo.path.replace('file://', ''),
      });
    }

    return await axios
      .post(`${URL}/create_match`, data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
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
          return res.data;
        } else {
          dispatch({
            type: constant.CREATE_LISTING_DONE,
          });
          ShowToast(res.data.message);
          return false;
        }
      })
      .catch(error => {
        console.log('create listing error', error);
        dispatch({
          type: constant.CREATE_LISTING_DONE,
        });
        return ShowToast('Some problem occured');
      });
  };
};

export const ListingsByUserID = (user_id, setMy_listings) => {
  return async dispatch => {
    dispatch({
      type: constant.GET_MY_LISTINGS,
    });

    await axios
      .get(`${URL}/get-listing/?user_id=${user_id}`, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then(res => {
        console.log('my listing response ===========>', res.data);
        setMy_listings(res.data)
        dispatch({
          type: constant.GET_MY_LISTINGS_DONE,
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
        dispatch({
          type: constant.JOIN_LISTING_DONE,
        });
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
  listing_sender_id,
  user_id,
  noti_text,
  listing_id,
) => {
  return async dispatch => {
    dispatch({
      type: constant.ACCEPT_REQUEST,
    });

    return await axios
      .post(
        `${URL}/accept-listing-request?sending_user_id=${listing_sender_id}&current_author_id=${user_id}&notification_text=${noti_text}&listing_id=${listing_id}`,
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
          type: constant.ACCEPT_REQUEST_DONE,
        });
        return res.data;
      })
      .catch(error => {
        console.log('accept listing error =======>', error);
        dispatch({
          type: constant.ACCEPT_REQUEST_DONE,
        });
        return ShowToast('Some problem occured');
      });
  };
};

export const RejectListing = (
  sending_user_id,
  author_id,
  noti_text,
  listing_id,
) => {
  return async dispatch => {
    dispatch({
      type: constant.REJECT_REQUEST,
    });

    return await axios
      .post(
        `${URL}/reject-request?sending_user_id=${sending_user_id}&current_author_id=${author_id}&notification_text=${noti_text}&listing_id=${listing_id}`,
        {},
        {
          headers: {
            Accept: 'application/json',
          },
        },
      )
      .then(res => {
        console.log('reject listing response ========>', res.data);
        if (res.data.message) {
          dispatch({
            type: constant.REJECT_REQUEST_DONE,
          });
        }
        return res.data;
      })
      .catch(error => {
        console.log('reject listing error =======>', error);
        dispatch({
          type: constant.REJECT_REQUEST_DONE,
        });
        return ShowToast('Some problem occured');
      });
  };
};

export const DeleteListing = (listing_id, user_id) => {
  return async dispatch => {
    dispatch({
      type: constant.DELETE_LISTING,
    });

    return await axios
      .delete(`${URL}/delete-listing/${listing_id}/${user_id}`)
      .then(res => {
        console.log('delete listing response ========>', res.data);
        dispatch({
          type: constant.DELETE_LISTING_DONE,
        });
        return res.data.message;
      })
      .catch(error => {
        console.log('delete listing error ========>', error);
        dispatch({
          type: constant.DELETE_LISTING_DONE,
        });
        return ShowToast('Some problem occured');
      });
  };
};

export const editListing = (
  listing_id,
  user_id,
  location_golfclub,
  description,
  suggested_day,
  suggested_time,
  how_many_players,
  area_code,
  the_itc_handshake,
  desired_tee_box,
  smoking_friendly,
  drinking_friendly,
  experience_level,
  private_match,
  hyper_link,
  listing_picture,
) => {
  return async dispatch => {
    dispatch({
      type: constant.EDIT_LISTING,
    });

    var data = new FormData();

    data.append('listing_id', listing_id);
    data.append('user_id', user_id);
    data.append('location_golfclub', location_golfclub);
    data.append('description', description);
    data.append('suggested_day', suggested_day);
    data.append('suggested_time', suggested_time);
    data.append('how_many_players', how_many_players);
    data.append('area_code', area_code);
    data.append('the_itc_handshake', the_itc_handshake);
    data.append('desired_tee_box', desired_tee_box);
    data.append('smoking_friendly', smoking_friendly);
    data.append('drinking_friendly', drinking_friendly);
    data.append('private_match', private_match);
    data.append('hyper_link', hyper_link);
    data.append('experience_level', experience_level);
    if (listing_picture) {
      data.append('listing_picture', {
        name: `${listing_picture.name}.jpg`,
        type: 'image/jpeg',
        uri:
          Platform.OS === 'android'
            ? listing_picture.path
            : listing_picture.path.replace('file://', ''),
      });
    }

    return await axios
      .post(`${URL}/update-listing/`, data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        console.log('edit listing response =========>', res.data);
        dispatch({
          type: constant.EDIT_LISTING_DONE,
        });
        return res.data.message;
      })
      .catch(error => {
        console.log('edit listing error ========>', error);
        dispatch({
          type: constant.EDIT_LISTING_DONE,
        });
        return ShowToast('Some problem occured');
      });
  };
};

export const renderListingMembers = listing_id => {
  return async dispatch => {
    return await axios
      .get(`${URL}/listing-connected-users?list_id=${listing_id}`, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then(res => {
        console.log('listing members response =======>', res.data);
        dispatch({
          type: constant.FETCH_LISTING_MEMBERS,
          payload: res.data,
        });
      })
      .catch(error => {
        console.log('listing members error =======>', error);
        return ShowToast('Some problem occured');
      });
  };
};

export const getListingStatus = (user_id, match_id, setListingStatus) => {
  return async dispatch => {
    dispatch({
      type: constant.LISTING_STATUS,
    });

    return await axios
      .get(`${URL}/listing-status?user_id=${user_id}&match_id=${match_id}`, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then(res => {
        console.log('response listing status', res.data);
        if (res.data) {
          setListingStatus(res.data);
          dispatch({
            type: constant.LISTING_STATUS_DONE,
          });
        } else {
          dispatch({
            type: constant.LISTING_STATUS_DONE,
          });
        }
      })
      .catch(error => {
        console.log('failed to get the listing status ========>', error);
        dispatch({
          type: constant.LISTING_STATUS_DONE,
        });
        // return ShowToast('Some problem occured');
      });
  };
};

export const sendListingMessage = (user_id, listing_id, message) => {
  return async dispatch => {
    var data = new FormData();

    data.append('from_user_id', user_id);
    data.append('listing_id', listing_id);
    data.append('message', message);

    await axios
      .post(
        `${URL}/listing-chat?from_user_id=${user_id}&listing_id=${listing_id}&message=${message}`,
        data,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then(res => {
        console.log('listing message send successfully', res.data.message);
      })
      .catch(error => {
        console.log('error sending listing message ========>', error);
        return ShowToast('Some problem occured');
      });
  };
};

export const ListingMessages = (match_id, setMessages) => {
  return async dispatch => {

    await axios
      .get(`${URL}/listing-chat-history?match_id=${match_id}`, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then(res => {
        // console.log('resss', res.data)

        const sortedMessages = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        setMessages(sortedMessages);
      })
      .catch(error => {
        console.log('listing fetch messages error ===========>', error);
        return ShowToast('Some problem occured');
      });
  };
};
