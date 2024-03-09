import constant from '../constant';

const initialState = {
  create_listing_loading: false,
  my_listings: [],
  my_listings_loader: false,
  listing_id: 0,
  join_loading: false,
  join_group_loading: false,
  accept_loader: false,
  reject_loader: false,
  delete_loader: false,
  edit_loader: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constant.CREATE_LISTING:
      return {...state, create_listing_loading: true};

    case constant.CREATE_LISTING_DONE:
      return {
        ...state,
        create_listing_loading: false,
        listing_id: action.payload,
      };

    case constant.GET_MY_LISTINGS:
      return {...state, my_listings_loader: true};

    case constant.GET_MY_LISTINGS_DONE:
      return {...state, my_listings_loader: false, my_listings: action.payload};

    case constant.JOIN_LISTING:
      return {...state, join_loading: true};

    case constant.JOIN_LISTING_DONE:
      return {
        ...state,
        [action.payload.listingId]: action.payload.status,
        join_loading: false,
      };

    case constant.JOIN_GROUP:
      return {...state, join_group_loading: true};

    case constant.JOIN_GROUP_DONE:
      return {
        ...state,
        join_group_loading: false,
        // [action.payload.listingId]: action.payload.status,
      };

    case constant.ACCEPT_REQUEST:
      return {...state, accept_loader: true};

    // case constant.ACCEPT_REQUEST_DONE:
    //   return {
    //     ...state,
    //     accept_loader: false,
    //     [action.payload.listingId]: action.payload.status,
    //   };

    case constant.ACCEPT_REQUEST_DONE:
      return {
        ...state,
        accept_loader: false,
      };

    case constant.REJECT_REQUEST:
      return {...state, reject_loader: true};

    case constant.REJECT_REQUEST_DONE:
      return {
        ...state,
        reject_loader: false,
      };

    case constant.DELETE_LISTING:
      return {...state, delete_loader: true};

    case constant.DELETE_LISTING_DONE:
      return {...state, delete_loader: false};

    case constant.EDIT_LISTING:
      return {...state, edit_loader: true};

    case constant.EDIT_LISTING_DONE:
      return {...state, edit_loader: false};

    default:
      return state;
  }
};
