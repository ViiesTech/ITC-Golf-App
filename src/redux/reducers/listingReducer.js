import constant from '../constant';

const initialState = {
  create_listing_loading: false,
  my_listings: [],
  my_listings_loader: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constant.CREATE_LISTING:
      return {...state, create_listing_loading: true};

    case constant.CREATE_LISTING_DONE:
      return {...state, create_listing_loading: false};

    case constant.GET_MY_LISTINGS:
      return {...state, my_listings_loader: true};

    case constant.GET_MY_LISTINGS_DONE:
      return {...state, my_listings_loader: false, my_listings: action.payload};

    default:
      return state;
  }
};
