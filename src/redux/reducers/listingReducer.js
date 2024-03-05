import constant from '../constant';

const initialState = {
  create_listing_loading: false,
  my_listings: [],
  my_listings_loader: false,
  listing_id: 0,
  join_loading: false,
  accept_loader: false,
  reject_loader: false,
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

    case constant.ACCEPT_LISTING:
      return {...state, accept_loader: true};

    case constant.ACCEPT_LISTING_DONE:
      return {...state, accept_loader: false};

    case constant.REJECT_LISTING:
      return {...state, reject_loader: true};

    case constant.REJECT_LISTING_DONE:
      return {...state, reject_loader: false};

    default:
      return state;
  }
};
