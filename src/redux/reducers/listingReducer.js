import constant from "../constant";

const initialState = {
    create_listing_loading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case constant.CREATE_LISTING:
            return { ...state, create_listing_loading: true }

        case constant.CREATE_LISTING_DONE:
            return { ...state, create_listing_loading: false }

        default:
            return state;
    }
}