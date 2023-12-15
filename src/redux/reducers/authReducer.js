import constant from "../constant";

const initialState = {
    user: {},
    signup_loading: false,
    signin_loading: false,
    edit_loading: false,
    reset_loading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case constant.SIGNUP:
            return { ...state, signup_loading: true }

        case constant.SIGNUP_DONE:
            return { ...state, signup_loading: false, user: action.payload }

        case constant.LOGIN:
            return { ...state, signin_loading: true }

        case constant.LOGIN_DONE:
            return { ...state, signin_loading: false, user: action.payload }

        case constant.EDIT_PROFILE:
            return { ...state, edit_loading: true }

        case constant.EDIT_PROFILE_DONE:
            return { ...state, edit_loading: false, user: action.payload }

        case constant.RESET_PASSWORD:
            return { ...state, reset_loading: true }

        case constant.RESET_PASSWORD_DONE:
            return { ...state, reset_loading: false }

        case constant.LOGOUT:
            return initialState;

        default:
            return state;
    }
}