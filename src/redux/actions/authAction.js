import constant, {URL} from '../constant';
import FormData from 'form-data';
import {ErrorToast} from 'react-native-toast-message';
import {ShowToast} from '../../Custom';
import axios from 'axios';

export const signup = (
  username,
  firstname,
  lastname,
  email,
  password,
  cpassword,
) => {
  return async dispatch => {
    // var data = new FormData();

    dispatch({
      type: constant.SIGNUP,
    });

    // data.append('custom_user_login', username);
    // data.append('custom_user_email', email);
    // data.append('custom_user_pass', password);
    // data.append('custom_user_pass_confirm', cpassword);
    // data.append('custom_user_first', firstname);
    // data.append('custom_user_last', lastname);

    return await fetch(
      `${URL}/signup?custom_user_login=${username}&custom_user_email=${email}&custom_user_pass=${password}&custom_user_pass_confirm=${cpassword}&custom_user_first=${firstname}&custom_user_last=${lastname}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: {},
      },
    )
      .then(async res => {
        const response = await res.json();
        console.log('signup response', response);
        if (response) {
          dispatch({
            type: constant.SIGNUP_DONE,
          });
          return true;
        }
      })
      .catch(error => {
        console.log('signup', error);
        dispatch({
          type: constant.SIGNUP_DONE,
        });
        return false;
      });
  };
};

export const signin = (username, password) => {
  return async dispatch => {
    var data = new FormData();

    dispatch({
      type: constant.LOGIN,
    });

    data.append('username', username);
    data.append('password', password);

    return await fetch(`${URL}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    })
      .then(async res => {
        const response = await res.json();
        if (response.token) {
          ShowToast('login successfully');
          dispatch({
            type: constant.LOGIN_DONE,
            payload: response.response,
            token: response.token,
          });
        } else {
          ShowToast(response.message);
          dispatch({
            type: constant.LOGIN_DONE,
          });
        }
      })
      .catch(error => {
        console.log('login error', error);
        ErrorToast(error.message);
        dispatch({
          type: constant.LOGIN_DONE,
        });
      });
  };
};

export const contactUs = (name, email, comment) => {
  return async dispatch => {
    dispatch({
      type: constant.CONTACT_US,
    });

    var data = new FormData();

    data.append('name', name);
    data.append('email', email);
    data.append('comment', comment);

    return await axios
      .post(`${URL}/contact-form`, data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        console.log('contact uss response ===================>', res.data);
        if (res.data.success) {
          dispatch({
            type: constant.CONTACT_US_DONE,
          });
          return res.data;
        } else {
          return res.data.success;
        }
      })
      .catch(error => {
        dispatch({
          type: constant.CONTACT_US_DONE,
        });
        ShowToast('Check your network, Try Again!' || error.code);
        return false;
      });
  };
};

export const resetPasswordLink = (username, email) => {
  return async dispatch => {
    dispatch({
      type: constant.SEND_PASSWORD_LINK,
    });

    var data = new FormData();

    data.append('username', username);
    data.append('email', email);

    // return console.log(data)

    return await axios
      .post(`${URL}/reset-password`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        console.log('password link response ====================>', res.data);
        if (res.data.success) {
          dispatch({
            type: constant.SEND_PASSWORD_LINK_DONE,
          });
          ShowToast(res.data.message);
          return res.data.success;
        } else {
          dispatch({
            type: constant.SEND_PASSWORD_LINK_DONE,
          });
          ShowToast(res.data.message);
          return false;
        }
      })
      .catch(error => {
        dispatch({
          type: constant.SEND_PASSWORD_LINK_DONE,
        });
        console.log(error);
        return ShowToast('Check your network, Try Again!' || error.message);
      });
  };
};

export const verifyOTP = (username, otp) => {
  return async dispatch => {
    dispatch({
      type: constant.VERIFY_TOKEN,
    });

    let data = {
      username: username,
      otp: otp,
    };

    return await axios
      .post(`${URL}/verify-reset-otp`, data, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then(res => {
        console.log('verify response ===============>', res.data);
        if (res.data.success) {
          dispatch({
            type: constant.VERIFY_TOKEN_DONE,
          });
          ShowToast(res.data.message);
          return res.data.success;
        } else {
          dispatch({
            type: constant.VERIFY_TOKEN_DONE,
          });
          ShowToast(res.data.message);
          return false;
        }
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: constant.VERIFY_TOKEN_DONE,
        });
        ShowToast('Check your network, Try Again!' || error);
        return false;
      });
  };
};

export const resetPassword = (username, otp, newPassword) => {
  return async dispatch => {
    dispatch({
      type: constant.RESET_PASSWORD,
    });

    let data = {
      username: username,
      otp: otp,
      new_password: newPassword,
    };

    return await axios
      .post(`${URL}/update-password`, data, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then(res => {
        console.log('password change response ================>', res.data);
        if (res.data.success) {
          dispatch({
            type: constant.RESET_PASSWORD_DONE,
          });
          ShowToast(res.data.message);
          return res.data.success;
        } else {
          dispatch({
            type: constant.RESET_PASSWORD_DONE,
          });
          ShowToast(res.data.message);
          return res.data.success;
        }
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: constant.RESET_PASSWORD_DONE,
        });
        ShowToast('Check your network, Try Again!' || error);
        return false;
      });
  };
};

export const editProfile = (
  user_id,
  register_id,
  firstname,
  lastname,
  area_code,
  exp_level,
  desired_tee_box,
  address,
  short_desc,
  profile_photo,
) => {
  return async dispatch => {
    dispatch({
      type: constant.EDIT_PROFILE,
    });

    var data = new FormData();
    data.append('user_id', user_id);
    data.append('author_register_id', register_id);
    data.append('firstname', firstname);
    data.append('lastname', lastname);
    data.append('area_code', area_code);
    data.append('experience_level', exp_level);
    data.append('desired_tee_box', desired_tee_box);
    data.append('address', address);
    data.append('short_description', short_desc);
    if (profile_photo) {
      data.append('profile_picture', {
        name: 'image.jpg',
        type: 'image/jpeg',
        uri:
          Platform.OS === 'android'
            ? profile_photo
            : profile_photo.replace('file://', ''),
      });
    }

    // return console.log('wah',data)

    return await axios
      .post(`${URL}/update-profile`, data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        console.log('edit profile response ==================>', res.data.data);
        dispatch({
          type: constant.EDIT_PROFILE_DONE,
          payload: res.data.data,
        });
        return res.data;
      })
      .catch(error => {
        console.log('edit profile response error =================>', error);
        dispatch({
          type: constant.EDIT_PROFILE_DONE,
        });
        return ShowToast('Some problem occured');
      });
  };
};

export const PlayersFollow = (user_id, listing_id, setPlayers) => {
  return async dispatch => {
    dispatch({
      type: constant.PLAYERS_FOLLOW,
    });

    await axios
      .get(
        `${URL}/followed-players/?user_id=${user_id}&listing_id=${listing_id}`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      )
      .then(res => {
        setPlayers(res.data)
        dispatch({
          type: constant.PLAYERS_FOLLOW_DONE,
        });
      })
      .catch(error => {
        dispatch({
          type: constant.PLAYERS_FOLLOW_DONE,
        });
        console.log('players you follow error =======>', error);
        return ShowToast('Some problem occured');
      });
  };
};

export const getWishlistById = (user_id, setWishlistItems) => {
  return async dispatch => {
    dispatch({
      type: constant.GET_WISHLIST,
    });

    console.log('from action', user_id);

    await axios
      .get(`${URL}/wishlist-items/${user_id}`, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then(res => {
        console.log('response of wishlist =========>', res.data);
        setWishlistItems(res.data)
        dispatch({
          type: constant.GET_WISHLIST_DONE,
        });
      })
      .catch(error => {
        console.log('failed to get wishlisttt =========>', error);
        dispatch({
          type: constant.GET_WISHLIST_DONE,
        });
        return ShowToast('Some problem occured');
      });
  };
};

export const DeactivateAccount = user_id => {
  return async dispatch => {
    return await axios
      .post(
        `${URL}/account/deactivate?user_id=${user_id}`,
        {},
        {
          headers: {
            Accept: 'application/json',
          },
        },
      )
      .then(res => {
        console.log('deactivate response =======>', res.data);
        dispatch({
          type: constant.DEACTIVATE_ACCOUNT,
        });
        return res.data;
      })
      .catch(error => {
        console.log('deactivate error ========>', error);
        return false;
      });
  };
};
