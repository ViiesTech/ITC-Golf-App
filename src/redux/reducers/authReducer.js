import constant from '../constant';

const initialState = {
  user: {},
  signup_loading: false,
  signin_loading: false,
  edit_loading: false,
  reset_loading: false,
  contact_loading: false,
  password_link_loading: false,
  verify_loading: false,
  follow_loader: false,
  players_follow: [],
  wishlist_loader: false,
  wishlist_items: [],
  register_id: null,
  token: '',
  card: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constant.SIGNUP:
      return {...state, signup_loading: true};

    case constant.SIGNUP_DONE:
      return {...state, signup_loading: false};

    case constant.LOGIN:
      return {...state, signin_loading: true};

    case constant.LOGIN_DONE:
      return {...state, signin_loading: false, user: action.payload, token: action.token};

    case constant.EDIT_PROFILE:
      return {...state, edit_loading: true};

    case constant.EDIT_PROFILE_DONE:
      return {...state, edit_loading: false, user: action.payload};

    case constant.SEND_PASSWORD_LINK:
      return {...state, password_link_loading: true};

    case constant.SEND_PASSWORD_LINK_DONE:
      return {...state, password_link_loading: false};

    case constant.VERIFY_TOKEN:
      return {...state, verify_loading: true};

    case constant.VERIFY_TOKEN_DONE:
      return {...state, verify_loading: false};

    case constant.RESET_PASSWORD:
      return {...state, reset_loading: true};

    case constant.RESET_PASSWORD_DONE:
      return {...state, reset_loading: false};

    case constant.CONTACT_US:
      return {...state, contact_loading: true};

    case constant.CONTACT_US_DONE:
      return {...state, contact_loading: false};

    case constant.PLAYERS_FOLLOW:
      return {...state, follow_loader: true};

    case constant.PLAYERS_FOLLOW_DONE:
      return {...state, follow_loader: false, players_follow: action.payload};

    case constant.GET_WISHLIST:
      return {...state, wishlist_loader: true};

    case constant.GET_WISHLIST_DONE:
      return {...state, wishlist_loader: false, wishlist_items: action.payload}; 

    case constant.ADD_CARD_TO_WALLET:
      return {...state, card: action.payload}

    case constant.DEACTIVATE_ACCOUNT:
      return initialState;

    case constant.LOGOUT:
      return initialState;

    default:
      return state;
  }
};
