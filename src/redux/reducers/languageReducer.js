import constant from "../constant";

const initialState = {
    checkMark: 'English',
    showRecent: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case constant.SELECTED:
            return { ...state, checkMark: action.payload }

        case constant.ADD_RECENT:
            return { ...state, showRecent: action.payload }

        default:
            return state
    }
}