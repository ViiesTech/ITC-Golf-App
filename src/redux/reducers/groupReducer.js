import constant from '../constant';

const initialState = {
  create_group_loading: false,
  // my_groups: [],
  my_groups_loader: false,
  // my_groups_message: '',
  join_loading: false,
  delete_loader: false,
  edit_loader: false,
  // status_loader: false,
  group_detail_loader: false,
  group_members: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constant.CREATE_GROUP:
      return {...state, create_group_loading: true};

    case constant.CREATE_GROUP_DONE:
      return {...state, create_group_loading: false};

    case constant.GET_MY_GROUPS:
      return {...state, my_groups_loader: true};

    case constant.GET_MY_GROUPS_DONE:
      return {
        ...state,
        my_groups_loader: false,
        // my_groups: action.payload,
        // my_groups_message: state.my_groups.length < 1 && action.message,
      };

    case constant.DELETE_GROUP:
      return {...state, delete_loader: true};

    case constant.DELETE_GROUP_DONE:
      return {...state, delete_loader: false};

    case constant.JOIN_GROUP:
      return {...state, join_group_loading: true};

    case constant.JOIN_GROUP_DONE:
      return {
        ...state,
        join_group_loading: false,
      };

    case constant.EDIT_GROUP:
      return {...state, edit_loader: true};

    case constant.EDIT_GROUP_DONE:
      return {...state, edit_loader: false};

    case constant.FETCH_GROUP_MEMBERS:
      return {...state, group_members: action.payload};

    case constant.GET_GROUP_DETAIL_BY_ID:
      return {...state, group_detail_loader: true};

    case constant.GET_GROUP_DETAIL_BY_ID_DONE:
      return {...state, group_detail_loader: false};

    // case constant.GROUP_STATUS:
    //   return {...state, status_loader: true};

    // case constant.GROUP_STATUS_DONE:
    //   return {...state, status_loader: false};

    default:
      return state;
  }
};
