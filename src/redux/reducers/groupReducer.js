import constant from '../constant';

const initialState = {
  create_group_loading: false,
  my_groups: [],
  my_groups_loader: false,
  my_groups_message: '',
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

    default:
      return state;
  }
};
