import constant from '../constant';

const initialState = {
  products: [],
  products_loading: false,
  product_detail_loading: false,
  cart: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constant.RENDER_PRODUCT:
      return {...state, products_loading: true};

    case constant.RENDER_PRODUCT_DONE:
      return {...state, products_loading: false, products: action.payload};

    case constant.RENDER_DETAILS:
      return {...state, product_detail_loading: true};

    case constant.RENDER_DETAILS_DONE:
      return {
        ...state,
        product_detail_loading: false,
      };

    case constant.ADD_TO_CART:
      return {...state, cart: action.payload,};

    default:
      return state;
  }
};
