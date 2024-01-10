import constant from "../constant"

const initialState = {
    listing: [],
    groups: [],
    group_loader: false,
    loader: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case constant.GET_LISTING:
            return { ...state, loader: true }

        case constant.GET_LISTING_DONE:
            return { ...state, listing: action.payload, loader: false }

        case constant.GET_GROUPS:
            return { ...state, group_loader: true }

        case constant.GET_GROUPS_DONE:
            return { ...state, group_loader: false, groups: action.payload }

        default:
            return state;
    }
}