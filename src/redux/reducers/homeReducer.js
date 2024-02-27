import constant from '../constant';

const initialState = {
  listing: [],
  groups: [],
  group_loader: false,
  reviews: [],
  reviews_loading: false,
  loader: false,
  notification_loader: false,
  notifications: [],
  area_codes: [],
  groups_filter: [],
  filter_loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constant.GET_AREA_CODES:
      return {...state, area_codes: action.payload};

    case constant.GET_LISTING:
      return {...state, loader: true};

    case constant.GET_LISTING_DONE:
      return {...state, listing: action.payload, loader: false};

    case constant.GET_GROUPS:
      return {...state, group_loader: true};

    case constant.GET_GROUPS_DONE:
      return {...state, group_loader: false, groups: action.payload};

    case constant.GET_REVIEWS:
      return {...state, reviews_loading: true};

    case constant.GET_REVIEWS_DONE:
      return {...state, reviews_loading: false, reviews: action.payload};

    case constant.GET_NOTIFICATIONS:
      return {...state, notification_loader: true};

    case constant.GET_NOTIFICATIONS_DONE:
      return {
        ...state,
        notifications: action.payload,
        notification_loader: false,
      };
      

    case constant.GROUPS_BY_AREACODE:
      return {...state, filter_loading: true};

    case constant.GROUPS_BY_AREACODE_DONE:
      return {
        ...state,
        filter_loading: false,
        groups_filter: action.payload,
      };

    default:
      return state;
  }
};
