import constant from "../constant"

const initialState = {
    listing: [],
    loader: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case constant.GET_LISTING:
            return { ...state, loader: true }

        case constant.GET_LISTING_DONE:
            return { ...state, listing: action.payload, loader: false }
       
        default:
            return state;      
    }
}