import constant from '../constant';

const initialState = {
  create_group_loading: false,
  my_groups: [],
  my_groups_loader: false,
  my_groups_message: '',
  join_loading: false,
  accept_loader: false,
  reject_loader: false,
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
        my_groups: action.payload,
        my_groups_message: state.my_groups.length < 1 && action.message,
      };

    case constant.JOIN_GROUP:
      return {...state, join_loading: true};

    case constant.JOIN_GROUP_DONE:
      return {
        ...state,
        join_loading: false,
        [action.payload.listingId]: action.payload.status,
      };

    case constant.ACCEPT_GROUP:
      return {...state, accept_loader: true};

    case constant.ACCEPT_GROUP_DONE:
      return {
        ...state,
        accept_loader: false,
      };

    case constant.REJECT_GROUP:
      return {...state, reject_loader: true};

    case constant.REJECT_GROUP_DONE:
      return {
        ...state,
        reject_loader: false,
      };

    default:
      return state;
  }
};
