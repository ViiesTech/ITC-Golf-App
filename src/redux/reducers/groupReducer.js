import constant from "../constant";

const initialState = {
    create_group_loading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case constant.CREATE_GROUP:
            return { ...state, create_group_loading: true }

        case constant.CREATE_GROUP_DONE:
            return { ...state, create_group_loading: false }

        default:
            return state;
    }
}