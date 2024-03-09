import axios from 'axios';
import constant, {URL} from '../constant';
import {ShowToast} from '../../Custom';
import {Platform} from 'react-native';
import FormData from 'form-data';

export const createGroup = (
  group_title,
  private_group,
  description,
  area_code,
  itc_handshake,
  desired_tee,
  suggested_day,
  kind_listing,
  hyperlink,
  user_id,
  photo,
) => {
  return async dispatch => {
    dispatch({
      type: constant.CREATE_GROUP,
    });

    var data = new FormData();

    data.append('listing_title', group_title);
    data.append('private_group', private_group);
    data.append('listing_content', description);
    data.append('area_code', area_code);
    data.append('itc_group_handshake', itc_handshake);
    data.append('group_desired_teebox', desired_tee);
    data.append('suggested_day', suggested_day);
    data.append('what_kind_of_match_is_this', kind_listing);
    data.append('hyper_link', hyperlink);
    data.append('user_id', user_id);
    if (photo) {
      data.append('group_picture', {
        name: `${photo.name}.jpg`,
        type: 'image/jpeg',
        uri:
          Platform.OS === 'android'
            ? photo.path
            : photo.path.replace('file://', ''),
      });
    }

   return await axios
      .post(`${URL}/create_group`, data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        console.log(
          'creating group response ======================>',
          res.data,
        );
        if (res.data.post_id) {
          dispatch({
            type: constant.CREATE_GROUP_DONE,
          });
          ShowToast(res.data.message);
          return res.data
        } else {
          dispatch({
            type: constant.CREATE_GROUP_DONE,
          });
          ShowToast(res.data.message);
          return false
        }
      })
      .catch(error => {
        dispatch({
          type: constant.CREATE_GROUP_DONE,
        });
        return ShowToast('Check your network, Try Again!' || error.code);
      });
  };
};

export const getGroupsById = user_id => {
  return async dispatch => {
    console.log('user id ======>', user_id);

    dispatch({
      type: constant.GET_MY_GROUPS,
    });

    await axios
      .get(`${URL}/groups/${user_id}`, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then(res => {
        console.log('my groups response ==========>', res.data);
        dispatch({
          type: constant.GET_MY_GROUPS_DONE,
          payload: res.data,
          message: 'No groups found',
        });
      })
      .catch(error => {
        console.log('my groups error =======>', error);
        dispatch({
          type: constant.GET_MY_GROUPS_DONE,
        });
        return ShowToast('Some problem occured');
      });
  };
};

export const JoinGroup = (
  user_id,
  group_id,
  post_id,
  private_or_not,
  author_email,
  noti_text,
) => {
  return async dispatch => {
    dispatch({
      type: constant.JOIN_GROUP,
    });

    console.log(noti_text);

    return await axios
      .post(
        `${URL}/join-group?current_user_id=${user_id}&current_group_id=${group_id}&current_post_author_id_for_group=${post_id}&private_or_not=${private_or_not}&current_post_author_email_for_group=${author_email}&notification_text=${noti_text}`,
        {},
        {
          headers: {
            Accept: 'application/json',
          },
        },
      )
      .then(res => {
        console.log('join group response =======>', res.data);
        // dispatch({
        //   type: constant.JOIN_GROUP_DONE,
        // });
        return res.data;
      })
      .catch(error => {
        console.log('join group error =========>', error);
        dispatch({
          type: constant.JOIN_GROUP_DONE,
        });
        return ShowToast('Some problem occured');
      });
  };
};

// export const AcceptGroup = (
//   user_id,
//   author_id,
//   user_email,
//   noti_text,
//   group_id,
// ) => {
//   return async dispatch => {
//     dispatch({
//       type: constant.ACCEPT_GROUP,
//     });

//     return await axios
//       .post(
//         `${URL}/group-accept?sending_user_id=${user_id}&current_author_id=${author_id}&sending_user_email=${user_email}&notification_text=${noti_text}&group_id=${group_id}`,
//         {},
//         {
//           headers: {
//             Accept: 'application/json',
//           },
//         },
//       )
//       .then(res => {
//         console.log('accept group respponse =====>', res.data);
//         dispatch({
//           type: constant.ACCEPT_GROUP_DONE,
//         });
//         return res.data;
//       })
//       .catch(error => {
//         console.log('accept group error =========>', error);
//         dispatch({
//           type: constant.ACCEPT_GROUP_DONE,
//         });
//         return ShowToast('Some problem occured');
//       });
//   };
// };

// export const RejectGroup = (
//   user_id,
//   author_id,
//   user_email,
//   noti_text,
//   group_id,
// ) => {
//   return async dispatch => {
//     dispatch({
//       type: constant.REJECT_GROUP,
//     });

//     return await axios
//       .post(
//         `${URL}/group-reject-request?sending_user_id=${user_id}&current_author_id=${author_id}&sending_user_email=${user_email}&notification_text=${noti_text}&group_id=${group_id}`,
//         {},
//         {
//           headers: {
//             Accept: 'application/json',
//           },
//         },
//       )
//       .then(res => {
//         console.log('reject group response ========>', res.data);
//         dispatch({
//           type: constant.REJECT_GROUP_DONE,
//         });
//         return res.data;
//       })
//       .catch(error => {
//         console.log('reject group error ==========>', error);
//         dispatch({
//           type: constant.REJECT_GROUP_DONE,
//         });
//         return ShowToast('Some problem occured');
//       });
//   };
// };

export const DeleteGroup = (group_id, user_id) => {
  return async dispatch => {
    dispatch({
      type: constant.DELETE_GROUP,
    });

    return await axios
      .delete(`${URL}/delete-group/${group_id}/${user_id}`)
      .then(res => {
        console.log('delete group response ========>', res.data);
        dispatch({
          type: constant.DELETE_GROUP_DONE,
        });
        return res.data.message;
      })
      .catch(error => {
        console.log('delete group error =======>', error);
        dispatch({
          type: constant.DELETE_GROUP_DONE,
        });
        return ShowToast('Some problem occured');
      });
  };
};

export const editGroup = (
  group_id,
  user_id,
  listing_title,
  listing_content,
  private_group,
  area_code,
  itc_group_handshake,
  group_desired_teebox,
  suggested_day,
  what_kind_of_match_is_this,
  hyper_link,
  group_picture,
) => {
  return async dispatch => {
    dispatch({
      type: constant.EDIT_GROUP,
    });

    var data = new FormData();

    data.append('group_id', group_id);
    data.append('user_id', user_id);
    data.append('listing_title', listing_title);
    data.append('listing_content', listing_content);
    data.append('private_group', private_group);
    data.append('area_code', area_code);
    data.append('itc_group_handshake', itc_group_handshake);
    data.append('group_desired_teebox', group_desired_teebox);
    data.append('suggested_day', suggested_day);
    data.append('what_kind_of_match_is_this', what_kind_of_match_is_this);
    data.append('hyper_link', hyper_link);
    if (group_picture) {
      data.append('group_picture', {
        name: `${group_picture.name}.jpg`,
        type: 'image/jpeg',
        uri:
          Platform.OS === 'android'
            ? group_picture.path
            : group_picture.path.replace('file://', ''),
      });
    }

    return await axios
      .post(`${URL}/update-group`, data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        console.log('edit group response ===========>', res.data);
        dispatch({
          type: constant.EDIT_GROUP_DONE,
        });
        return res.data.message;
      })
      .catch(error => {
        console.log('edit group error ==========>', error);
        dispatch({
          type: constant.EDIT_GROUP_DONE,
        });
        return ShowToast('Some problem occured');
      });
  };
};
