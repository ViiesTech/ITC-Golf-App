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
    if (photo?.path) {
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
          return res.data;
        } else {
          dispatch({
            type: constant.CREATE_GROUP_DONE,
          });
          ShowToast(res.data.message);
          return false;
        }
      })
      .catch(error => {
        console.log('group creating error', error);
        dispatch({
          type: constant.CREATE_GROUP_DONE,
        });
        return ShowToast('Some problem occured');
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
        `${URL}/join-group?current_user_id=${user_id}&current_group_id=${group_id}&current_post_author_id_for_group=${post_id}&private_or_not=${private_or_not}&current_post_author_email=${author_email}&notification_text=${noti_text}}`,
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

export const AcceptGroup = (
  sending_user_id,
  author_id,
  noti_text,
  group_id,
) => {
  return async dispatch => {
    dispatch({
      type: constant.ACCEPT_REQUEST,
    });

    return await axios
      .post(
        `${URL}/group-accept?sending_user_id=${sending_user_id}&current_author_id=${author_id}&notification_text=${noti_text}&group_id=${group_id}`,
        {},
        {
          headers: {
            Accept: 'application/json',
          },
        },
      )
      .then(res => {
        console.log('accept group response ====>', res.data);
        if (res.data.success) {
          dispatch({
            type: constant.ACCEPT_REQUEST_DONE,
          });
        } else {
          dispatch({
            type: constant.ACCEPT_REQUEST_DONE,
          });
        }
        return res.data;
      })
      .catch(error => {
        console.log('acceot group error ======>', error);
        dispatch({
          type: constant.ACCEPT_REQUEST_DONE,
        });
        return ShowToast('Some problem occured');
      });
  };
};

export const RejectGroup = (
  sending_user_id,
  author_id,
  noti_text,
  group_id,
) => {
  return async dispatch => {
    dispatch({
      type: constant.REJECT_REQUEST,
    });


    return await axios
      .post(
        `${URL}/group-reject-request?sending_user_id=${sending_user_id}&current_author_id=${author_id}&notification_text=${noti_text}&group_id=${group_id}`,
        {},
        {
          headers: {
            Accept: 'application/json',
          },
        },
      )
      .then(res => {
        console.log('reject group response =====>', res.data);
        dispatch({
          type: constant.REJECT_REQUEST_DONE,
        });
        return res.data;
      })
      .catch(error => {
        console.log('reject group error ========>', error);
        dispatch({
          type: constant.REJECT_REQUEST_DONE,
        });
        return ShowToast('Some problem occured');
      });
  };
};

export const fetchGroupMembers = group_id => {
  return async dispatch => {
    return await axios
      .get(`${URL}/group-connected-users?group_id=${group_id}`, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then(res => {
        console.log('group members response =====>', res.data);
        dispatch({
          type: constant.FETCH_GROUP_MEMBERS,
          payload: res.data,
        });
      })
      .catch(error => {
        return ShowToast('Some problem occured');
      });
  };
};

export const sendGroupMessage = (user_id, group_id, message) => {
  return async dispatch => {
    var data = new FormData();

    data.append('from_user_id', user_id);
    data.append('group_id', group_id);
    data.append('message', message);

    await axios
      .post(
        `${URL}/group-chat?from_user_id=${user_id}&message=${message}&group_id=${group_id}`,
        data,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then(res => {
        console.log('group message send response =======>', res.data);
      })
      .catch(error => {
        console.log('group message send error =========>', error);
        return ShowToast('Some problem occured');
      });
  };
};

export const groupMessages = (group_id, setMessages) => {
  return async dispatch => {
    await axios
      .get(`${URL}/group-chat-history?group_id=${group_id}`, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then(res => {
        console.log('fetch group messages response =======>', res.data);
        const sortedMessages = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        setMessages(sortedMessages);
      })
      .catch(error => {
        console.log('error fetching group messages ======>', error);
        return ShowToast('Some problem occured');
      });
  };
};

export const getGroupStatus = (user_id, group_id, setGroupStatus) => {
  return async dispatch => {
    dispatch({
      type: constant.GROUP_STATUS,
    });

    return await axios
      .get(`${URL}/group-status?user_id=${user_id}&group_id=${group_id}`, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then(res => {
        console.log('response group status', res.data);
        if (res.data) {
          setGroupStatus(res.data);
          dispatch({
            type: constant.GROUP_STATUS_DONE,
          });
        } else {
          dispatch({
            type: constant.GROUP_STATUS_DONE,
          });
        }
      })
      .catch(error => {
        console.log('failed to get the group status ========>', error);
        dispatch({
          type: constant.GROUP_STATUS_DONE,
        });
        // return ShowToast('Some problem occured');
      });
  };
};
